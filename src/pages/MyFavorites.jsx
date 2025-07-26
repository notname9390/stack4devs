import { useEffect, useState } from 'react';
import { getCurrentUser, getFavorites, removeFavoriteTool, removeFavoriteStack } from '../utils/localAuth';
import { Link } from 'react-router-dom';
import { Heart, ExternalLink, Trash2 } from 'lucide-react';

const MyFavorites = () => {
  const [favorites, setFavorites] = useState({ tools: [], stacks: [] });
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (currentUser) {
      setFavorites(getFavorites(currentUser));
    }
  }, [currentUser]);

  function handleRemoveTool(tool) {
    removeFavoriteTool(currentUser, tool);
    setFavorites(fav => ({ ...fav, tools: fav.tools.filter(t => t.name !== tool.name) }));
  }

  function handleRemoveStack(stack) {
    removeFavoriteStack(currentUser, stack);
    setFavorites(fav => ({ ...fav, stacks: fav.stacks.filter(s => s.id !== stack.id) }));
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to view your favorites.</h2>
          <Link to="/account" className="btn-primary">Go to Account</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Heart className="h-7 w-7 text-red-500 fill-red-500" /> My Favorites
        </h1>
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-2">Favorite Tools</h2>
          {favorites.tools.length === 0 ? (
            <p className="text-gray-500">No favorite tools yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favorites.tools.map((tool, i) => (
                <div key={i} className="card flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">{tool.name}</span>
                    <button onClick={() => handleRemoveTool(tool)} title="Remove from favorites">
                      <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                    </button>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full w-fit">{tool.purpose}</span>
                  <span className="text-sm text-gray-600">{tool.description}</span>
                  <a href={tool.link} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs w-fit mt-2 flex items-center gap-1">
                    Visit Tool <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Favorite Stacks</h2>
          {favorites.stacks.length === 0 ? (
            <p className="text-gray-500">No favorite stacks yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favorites.stacks.map((stack, i) => (
                <div key={i} className="card flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">{stack.field} (${stack.budget_min}-{stack.budget_max})</span>
                    <button onClick={() => handleRemoveStack(stack)} title="Remove from favorites">
                      <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                    </button>
                  </div>
                  <span className="text-xs text-gray-600">{stack.tools.length} tools</span>
                  <Link to={`/stack?field=${encodeURIComponent(stack.field)}&budget=${stack.budget_max}`} className="btn-secondary text-xs w-fit mt-2">View Stack</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyFavorites; 