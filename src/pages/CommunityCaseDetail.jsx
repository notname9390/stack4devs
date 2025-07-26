import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Eye, Share2, ExternalLink, MessageCircle, Calendar, User } from 'lucide-react';
import { getCommunityCases, likeCommunityCase, incrementViews, shareToPlatform } from '../utils/communityCases';
import { getCurrentUser } from '../utils/localAuth';
import tools from '../data/tools.json';

const CommunityCaseDetail = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    loadCaseData();
  }, [caseId]);

  const loadCaseData = () => {
    const cases = getCommunityCases();
    const foundCase = cases.find(c => c.id === caseId);
    
    if (foundCase) {
      setCaseData(foundCase);
      incrementViews(caseId);
    }
    setLoading(false);
  };

  const handleLike = () => {
    if (!currentUser) {
      alert('Please sign in to like cases');
      return;
    }
    
    const updatedCase = likeCommunityCase(caseId);
    if (updatedCase) {
      setCaseData(updatedCase);
    }
  };

  const handleShare = (platform) => {
    const result = shareToPlatform(caseData, platform);
    setShowShareMenu(false);
    
    if (result === 'Copied to clipboard! Paste in Discord.') {
      alert(result);
    }
  };

  const getToolDetails = (toolId) => {
    return tools.find(t => t.id === toolId) || { name: toolId, description: 'Tool not found', link: '#' };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">Loading case details...</p>
        </div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Case not found</h2>
          <p className="text-gray-600 mb-6">The case you're looking for doesn't exist or has been removed.</p>
          <Link to="/community-cases" className="btn-primary">
            Back to Community Cases
          </Link>
        </div>
      </div>
    );
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
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{caseData.title}</h1>
              <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {caseData.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(caseData.created_at)}
                </div>
              </div>
            </div>
            
            {/* Share Button */}
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="btn-secondary inline-flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
              
              {showShareMenu && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10 min-w-[200px]">
                  <div className="text-xs font-medium text-gray-700 mb-2">Share via:</div>
                  <div className="space-y-1">
                    {[
                      { key: 'whatsapp', label: 'WhatsApp', icon: '💬' },
                      { key: 'whatsapp-business', label: 'WhatsApp Business', icon: '💼' },
                      { key: 'instagram', label: 'Instagram', icon: '📷' },
                      { key: 'messenger', label: 'Messenger', icon: '💭' },
                      { key: 'x', label: 'X (Twitter)', icon: '🐦' },
                      { key: 'reddit', label: 'Reddit', icon: '🤖' },
                      { key: 'discord', label: 'Discord', icon: '🎮' }
                    ].map((platform) => (
                      <button
                        key={platform.key}
                        onClick={() => handleShare(platform.key)}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded flex items-center gap-2"
                      >
                        <span>{platform.icon}</span>
                        {platform.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Case Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed">{caseData.description}</p>
            </div>

            {/* Tools */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseData.tools.map((toolId, index) => {
                  const tool = getToolDetails(toolId);
                  return (
                    <div key={toolId} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {tool.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
                      <a
                        href={tool.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-xs inline-flex items-center gap-1"
                      >
                        Visit Tool
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Case Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Budget:</span>
                  <span className="font-semibold text-green-600">${caseData.budget}/month</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tools:</span>
                  <span className="font-semibold">{caseData.tools.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Likes:</span>
                  <span className="font-semibold">{caseData.likes || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Views:</span>
                  <span className="font-semibold">{caseData.views || 0}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="card">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleLike}
                  className="w-full btn-secondary inline-flex items-center justify-center gap-2"
                >
                  <Heart className="h-4 w-4" />
                  {currentUser ? 'Like Case' : 'Sign in to Like'}
                </button>
                
                <Link
                  to={`/stack?field=${encodeURIComponent(caseData.title.split(' ')[0])}&budget=${caseData.budget}`}
                  className="btn-recommend w-full justify-center"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Get Similar Stack
                </Link>
              </div>
            </div>

            {/* Social Links */}
            {Object.values(caseData.social_links).some(link => link) && (
              <div className="card">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Connect with Author</h3>
                <div className="space-y-2">
                  {Object.entries(caseData.social_links).map(([platform, link]) => {
                    if (!link) return null;
                    
                    const platformNames = {
                      whatsapp: 'WhatsApp',
                      instagram: 'Instagram',
                      discord: 'Discord',
                      reddit: 'Reddit',
                      x: 'X (Twitter)'
                    };
                    
                    return (
                      <a
                        key={platform}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {platformNames[platform]}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityCaseDetail; 