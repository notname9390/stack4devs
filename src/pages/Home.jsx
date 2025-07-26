import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, DollarSign } from 'lucide-react';

const Home = () => {
  const [field, setField] = useState('');
  const [budget, setBudget] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (field.trim() && budget.trim()) {
      navigate(`/stack?field=${encodeURIComponent(field.trim())}&budget=${encodeURIComponent(budget.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Find the perfect stack for your project
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Just tell us what kind of developer you are and how much you're working with.
          </p>
        </div>

        {/* Form Section */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="field" className="block text-sm font-medium text-gray-700 mb-2">
                What kind of builder are you?
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  id="field"
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                  placeholder="e.g., marketing, website, game dev"
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                What's your monthly tool budget?
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  id="budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g., 0, 25, 100"
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full text-lg py-4"
            >
              Build My Stack
            </button>
          </form>

          {/* Examples */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 mb-4">Popular examples:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { field: 'marketing', budget: '0' },
                { field: 'website', budget: '50' },
                { field: 'game dev', budget: '200' },
                { field: 'business', budget: '500' },
                { field: 'marketing', budget: '1000' },
                { field: 'website', budget: '2000' }
              ].map((example, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setField(example.field);
                    setBudget(example.budget);
                  }}
                  className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200"
                >
                  {example.field} • ${example.budget}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 