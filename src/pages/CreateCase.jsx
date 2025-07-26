import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import { addCommunityCase } from '../utils/communityCases';
import { getCurrentUser } from '../utils/localAuth';
import tools from '../data/tools.json';

const CreateCase = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: 0,
    tools: [],
    social_links: {
      whatsapp: '',
      instagram: '',
      discord: '',
      reddit: '',
      x: ''
    }
  });

  useEffect(() => {
    if (!currentUser) {
      navigate('/account');
    }
  }, [currentUser, navigate]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      social_links: {
        ...prev.social_links,
        [platform]: value
      }
    }));
  };

  const handleToolToggle = (toolId) => {
    setFormData(prev => ({
      ...prev,
      tools: prev.tools.includes(toolId)
        ? prev.tools.filter(id => id !== toolId)
        : [...prev.tools, toolId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || formData.tools.length === 0) {
      alert('Please fill in all required fields and select at least one tool.');
      return;
    }

    setLoading(true);
    
    try {
      const newCase = addCommunityCase({
        ...formData,
        author: currentUser
      });
      
      alert('Case created successfully! It will be reviewed and approved soon.');
      navigate('/community-cases');
    } catch (error) {
      alert('Error creating case. Please try again.');
      console.error('Error creating case:', error);
    } finally {
      setLoading(false);
    }
  };

  const budgetOptions = [0, 5, 10, 25, 50, 100, 200, 500, 1000];

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/community-cases')}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Community Cases
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Community Case</h1>
          <p className="text-gray-600">Share your tool stack with the community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Case Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="input-field"
                  placeholder="e.g., Launch a Podcast, Start a Dropshipping Business"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="input-field"
                  rows={4}
                  placeholder="Describe your use case and what tools you recommend..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Budget *
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', parseInt(e.target.value))}
                  className="input-field"
                  required
                >
                  {budgetOptions.map(budget => (
                    <option key={budget} value={budget}>
                      ${budget}/month
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Tool Selection */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Tools *</h2>
            <p className="text-gray-600 mb-4">Choose the tools you recommend for this use case</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
              {tools.map(tool => (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => handleToolToggle(tool.id)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    formData.tools.includes(tool.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium text-sm">{tool.name}</div>
                  <div className="text-xs text-gray-500">{tool.category}</div>
                </button>
              ))}
            </div>
            
            {formData.tools.length > 0 && (
              <div className="mt-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Selected Tools:</div>
                <div className="flex flex-wrap gap-2">
                  {formData.tools.map(toolId => {
                    const tool = tools.find(t => t.id === toolId);
                    return (
                      <span
                        key={toolId}
                        className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                      >
                        {tool?.name || toolId}
                        <button
                          type="button"
                          onClick={() => handleToolToggle(toolId)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Social Media Links */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Social Media Links (Optional)</h2>
            <p className="text-gray-600 mb-4">Add your social media profiles for community engagement</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'whatsapp', label: 'WhatsApp', placeholder: 'Your WhatsApp number or group link' },
                { key: 'instagram', label: 'Instagram', placeholder: 'Your Instagram profile URL' },
                { key: 'discord', label: 'Discord', placeholder: 'Your Discord server invite link' },
                { key: 'reddit', label: 'Reddit', placeholder: 'Your Reddit profile or subreddit' },
                { key: 'x', label: 'X (Twitter)', placeholder: 'Your X/Twitter profile URL' }
              ].map(platform => (
                <div key={platform.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {platform.label}
                  </label>
                  <input
                    type="text"
                    value={formData.social_links[platform.key]}
                    onChange={(e) => handleSocialLinkChange(platform.key, e.target.value)}
                    className="input-field"
                    placeholder={platform.placeholder}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/community-cases')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary inline-flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Create Case
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCase; 