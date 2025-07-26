import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usecases from '../data/usecases.json';
import tools from '../data/tools.json';

const UseCaseExplorer = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (usecase) => {
    // For now, just use the first tool's category as field (or fallback to usecase.title)
    let field = usecase.title.toLowerCase().split(' ')[0];
    if (usecase.recommended_tools && usecase.recommended_tools.length > 0) {
      const firstTool = tools.find(t => t.id === usecase.recommended_tools[0]);
      if (firstTool && firstTool.category) field = firstTool.category.toLowerCase();
    }
    navigate(`/stack?field=${encodeURIComponent(field)}&budget=${usecase.default_budget}`, {
      state: { usecaseId: usecase.id, recommended_tools: usecase.recommended_tools }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-10">Use Case Explorer</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {usecases.map((uc) => (
            <div
              key={uc.id}
              className="card cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-400"
              onClick={() => handleSelect(uc)}
            >
              <h2 className="text-2xl font-bold mb-2">{uc.title}</h2>
              <p className="mb-4 text-gray-600">{uc.description}</p>
              <div className="mb-2 text-sm text-gray-500">Default Budget: <span className="font-semibold">${uc.default_budget}/month</span></div>
              <div className="flex flex-wrap gap-2 mt-2">
                {uc.recommended_tools.map(tid => {
                  const tool = tools.find(t => t.id === tid);
                  return tool ? (
                    <span key={tid} className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                      {tool.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UseCaseExplorer; 