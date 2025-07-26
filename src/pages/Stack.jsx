import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ExternalLink, Heart, HeartOff, RefreshCw, Star } from 'lucide-react';
import stacksData from '../data/stacks.json';
import { getCurrentUser, addFavoriteTool, removeFavoriteTool, addFavoriteStack, removeFavoriteStack } from '../utils/localAuth';
import { getSettings } from '../utils/settings';

const Stack = () => {
  const [searchParams] = useSearchParams();
  const [stack, setStack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isStackFavorited, setIsStackFavorited] = useState(false);
  const [favoriteTools, setFavoriteTools] = useState(new Set());
  const [aiPreference, setAiPreference] = useState('manual');
  const [selectedAlternatives, setSelectedAlternatives] = useState({});

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    
    const settings = getSettings();
    setAiPreference(settings.aiPreference);

    const field = searchParams.get('field') || '';
    const budget = parseInt(searchParams.get('budget') || '0');

    // Find the best matching stack
    const matchingStack = findBestStack(field, budget);
    setStack(matchingStack);
    setLoading(false);

    // Check if stack is favorited
    if (user && matchingStack) {
      const favorites = JSON.parse(localStorage.getItem(`favorites_${user}`) || '{"tools":[],"stacks":[]}');
      setIsStackFavorited(favorites.stacks.some(s => s.id === matchingStack.id));
      setFavoriteTools(new Set(favorites.tools.map(t => t.name)));
    }
  }, [searchParams]);

  const findBestStack = (field, budget) => {
    // Define budget tiers that match the user's request
    const budgetTiers = [0, 10, 50, 100, 200, 500, 1000, 2000, 3000, 4000, 5000];
    
    // Find the appropriate budget tier for the user's budget
    let targetBudget = 0;
    for (let i = 0; i < budgetTiers.length; i++) {
      if (budget <= budgetTiers[i]) {
        targetBudget = budgetTiers[i];
        break;
      }
    }
    // If budget is higher than all tiers, use the highest
    if (budget > budgetTiers[budgetTiers.length - 1]) {
      targetBudget = budgetTiers[budgetTiers.length - 1];
    }

    // First try exact field match with the target budget
    let matchingStacks = stacksData.filter(s => 
      s.field.toLowerCase() === field.toLowerCase() && 
      s.budget_min === targetBudget
    );

    // If no exact match, try fuzzy field matching
    if (matchingStacks.length === 0) {
      matchingStacks = stacksData.filter(s => 
        s.field.toLowerCase().includes(field.toLowerCase()) && 
        s.budget_min === targetBudget
      );
    }

    // If still no match, find the closest budget tier
    if (matchingStacks.length === 0) {
      const fieldMatches = stacksData.filter(s => 
        s.field.toLowerCase().includes(field.toLowerCase())
      );
      
      if (fieldMatches.length > 0) {
        // Find the closest budget tier
        const closestStack = fieldMatches.reduce((closest, current) => {
          const closestDiff = Math.abs(closest.budget_min - targetBudget);
          const currentDiff = Math.abs(current.budget_min - targetBudget);
          return currentDiff < closestDiff ? current : closest;
        });
        matchingStacks = [closestStack];
      }
    }

    // If still no match, return the first stack with the target budget
    if (matchingStacks.length === 0) {
      matchingStacks = stacksData.filter(s => s.budget_min === targetBudget);
    }

    // If still no match, return the first available stack
    return matchingStacks[0] || stacksData[0];
  };

  const handleFavoriteStack = () => {
    if (!currentUser) return;
    
    if (isStackFavorited) {
      removeFavoriteStack(currentUser, stack);
      setIsStackFavorited(false);
    } else {
      addFavoriteStack(currentUser, stack);
      setIsStackFavorited(true);
    }
  };

  const handleFavoriteTool = (tool) => {
    if (!currentUser) return;
    
    const newFavorites = new Set(favoriteTools);
    if (newFavorites.has(tool.name)) {
      removeFavoriteTool(currentUser, tool);
      newFavorites.delete(tool.name);
    } else {
      addFavoriteTool(currentUser, tool);
      newFavorites.add(tool.name);
    }
    setFavoriteTools(newFavorites);
  };

  const getAction = (tool) => {
    const p = tool.purpose.toLowerCase();
    const automation = tool.automation || 'manual';
    const aiFeatures = tool.aiFeatures || [];

    let baseAction = '';
    if (p.includes('hosting') || p.includes('website')) baseAction = `You can go and create your website with ${tool.name}.`;
    else if (p.includes('design')) baseAction = `Go and design with ${tool.name}.`;
    else if (p.includes('email')) baseAction = `Go and send your first campaign with ${tool.name}.`;
    else if (p.includes('social')) baseAction = `Go and promote with ${tool.name}.`;
    else if (p.includes('analytics')) baseAction = `Go and analyze your project with ${tool.name}.`;
    else if (p.includes('project')) baseAction = `Go and manage your team with ${tool.name}.`;
    else if (p.includes('api')) baseAction = `Test your APIs with ${tool.name}.`;
    else if (p.includes('version')) baseAction = `Host your code with ${tool.name}.`;
    else if (p.includes('game')) baseAction = `Start building your game with ${tool.name}.`;
    else if (p.includes('crm')) baseAction = `Manage your customers with ${tool.name}.`;
    else if (p.includes('automation')) baseAction = `Automate your workflow with ${tool.name}.`;
    else if (p.includes('accounting')) baseAction = `Manage your finances with ${tool.name}.`;
    else if (p.includes('communication')) baseAction = `Collaborate with your team using ${tool.name}.`;
    else if (p.includes('error')) baseAction = `Monitor your app with ${tool.name}.`;
    else if (p.includes('seo')) baseAction = `Boost your SEO with ${tool.name}.`;
    else if (p.includes('cloud')) baseAction = `Deploy your infrastructure with ${tool.name}.`;
    else baseAction = `Try ${tool.name} for your project!`;

    // Add automation context based on user preference
    if (aiPreference === 'ai' && automation === 'ai') {
      return `${baseAction} Let AI handle the heavy lifting!`;
    } else if (aiPreference === 'manual' && automation === 'auto') {
      return `${baseAction} Set up automation to save time!`;
    } else if (aiPreference === 'hybrid') {
      if (automation === 'ai') {
        return `${baseAction} AI-powered features will help you work smarter!`;
      } else if (automation === 'auto') {
        return `${baseAction} Automation features will streamline your workflow!`;
      }
    }
    return baseAction;
  };

  const getAutomationBadge = (tool) => {
    if (tool.automation === 'ai') {
      return <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">AI-Powered</span>;
    } else if (tool.automation === 'auto') {
      return <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">Automated</span>;
    }
    return null;
  };

  const getAlternativeTools = (currentTool) => {
    // Find tools with similar purpose in the same budget range
    return stacksData
      .filter(s => s.budget_min === stack.budget_min)
      .flatMap(s => s.tools)
      .filter(t => 
        t.purpose.toLowerCase() === currentTool.purpose.toLowerCase() && 
        t.name !== currentTool.name
      )
      .slice(0, 3); // Limit to 3 alternatives
  };

  const switchToAlternative = (originalTool, alternativeTool) => {
    setSelectedAlternatives(prev => ({
      ...prev,
      [originalTool.name]: alternativeTool
    }));
  };

  const resetToOriginal = (originalTool) => {
    setSelectedAlternatives(prev => {
      const newState = { ...prev };
      delete newState[originalTool.name];
      return newState;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">Building your perfect stack...</p>
        </div>
      </div>
    );
  }

  if (!stack) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No stack found</h2>
          <p className="text-gray-600 mb-4">We couldn't find a stack matching your criteria.</p>
          <a href="/" className="btn-primary">Try Again</a>
        </div>
      </div>
    );
  }

  const field = searchParams.get('field') || '';
  const budget = parseInt(searchParams.get('budget') || '0');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <h1 className="text-4xl font-bold text-gray-900">
              Your {field} Stack
            </h1>
            {currentUser && (
              <button
                onClick={handleFavoriteStack}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                title={isStackFavorited ? "Remove from favorites" : "Add to favorites"}
              >
                {isStackFavorited ? (
                  <Heart className="h-6 w-6 text-red-500 fill-red-500" />
                ) : (
                  <Heart className="h-6 w-6 text-gray-400" />
                )}
              </button>
            )}
          </div>
          <p className="text-xl text-gray-600 mb-4">
            Perfect for a <span className="font-semibold">${budget}/month</span> budget
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span>Curated for your needs</span>
          </div>
        </div>

        {/* Disclaimer for $0 budget */}
        {budget === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Free Stack Notice
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    You selected a $0 budget. This stack includes limited but free tools. 
                    stack4devs is not responsible for feature limitations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stack.tools.map((tool, index) => {
            const displayTool = selectedAlternatives[tool.name] || tool;
            const alternatives = getAlternativeTools(tool);
            
            return (
              <div key={`${tool.name}-${index}`} className="card">
                {/* Tool Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{displayTool.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                        {displayTool.purpose}
                      </span>
                      {getAutomationBadge(displayTool)}
                    </div>
                  </div>
                  {currentUser && (
                    <button
                      onClick={() => handleFavoriteTool(displayTool)}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors ml-2"
                      title={favoriteTools.has(displayTool.name) ? "Remove from favorites" : "Add to favorites"}
                    >
                      {favoriteTools.has(displayTool.name) ? (
                        <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                      ) : (
                        <Heart className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  )}
                </div>

                {/* Price */}
                <div className="mb-3">
                  <span className="text-lg font-semibold text-green-600">{displayTool.price}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4">{displayTool.description}</p>

                {/* AI Features */}
                {displayTool.aiFeatures && displayTool.aiFeatures.length > 0 && (
                  <div className="mb-4">
                    <div className="text-xs font-medium text-gray-600 mb-2">AI Features:</div>
                    <div className="flex flex-wrap gap-1">
                      {displayTool.aiFeatures.map((feature, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action */}
                <p className="text-sm text-gray-700 mb-4 italic">
                  {getAction(displayTool)}
                </p>

                {/* Buttons */}
                <div className="mt-auto space-y-2">
                  <a
                    href={displayTool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-recommend w-full justify-center"
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Try {displayTool.name}
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>

                  {/* Alternative Tools */}
                  {alternatives.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-gray-600">Not your style? Try:</div>
                      {alternatives.map((alt, altIndex) => (
                        <button
                          key={altIndex}
                          onClick={() => switchToAlternative(tool, alt)}
                          className="btn-alternative w-full justify-center text-xs"
                        >
                          <RefreshCw className="h-3 w-3 mr-1" />
                          {alt.name}
                        </button>
                      ))}
                      {selectedAlternatives[tool.name] && (
                        <button
                          onClick={() => resetToOriginal(tool)}
                          className="w-full text-xs text-gray-500 hover:text-gray-700 underline"
                        >
                          ← Back to {tool.name}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500">
            Need a different budget or field? <a href="/" className="text-blue-600 hover:underline">Start over</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stack; 