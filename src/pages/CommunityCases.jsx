import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Heart, Eye, Share2, MessageCircle, ExternalLink } from 'lucide-react';
import { getApprovedCases, likeCommunityCase, incrementViews, shareToPlatform } from '../utils/communityCases';
import { getCurrentUser } from '../utils/localAuth';
import tools from '../data/tools.json';

const CommunityCases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(null);
  const currentUser = getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = () => {
    const communityCases = getApprovedCases();
    setCases(communityCases);
    setLoading(false);
  };

  const handleLike = (caseId) => {
    const updatedCase = likeCommunityCase(caseId);
    if (updatedCase) {
      setCases(prev => prev.map(c => c.id === caseId ? updatedCase : c));
    }
  };

  const handleView = (caseId) => {
    incrementViews(caseId);
    navigate(`/community-case/${caseId}`);
  };

  const handleShare = (caseData, platform) => {
    const result = shareToPlatform(caseData, platform);
    setShowShareMenu(null);
    
    if (result === 'Copied to clipboard! Paste in Discord.') {
      alert(result);
    }
  };

  const getToolName = (toolId) => {
    const tool = tools.find(t => t.id === toolId);
    return tool ? tool.name : toolId;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">Loading community cases...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Community Cases
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover tool stacks created by the community
          </p>
          {currentUser && (
            <Link
              to="/create-case"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Create New Case
            </Link>
          )}
        </div>

        {/* Cases Grid */}
        {cases.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No community cases yet</h3>
            <p className="text-gray-600 mb-6">Be the first to create a community case!</p>
            {currentUser ? (
              <Link to="/create-case" className="btn-primary">
                Create First Case
              </Link>
            ) : (
              <Link to="/account" className="btn-primary">
                Sign in to Create
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((caseItem) => (
              <div key={caseItem.id} className="card group">
                {/* Case Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {caseItem.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      by <span className="font-semibold">{caseItem.author}</span>
                    </p>
                    <p className="text-gray-500 text-xs">
                      {formatDate(caseItem.created_at)}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {caseItem.description}
                </p>

                {/* Budget */}
                <div className="mb-4">
                  <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                    ${caseItem.budget}/month
                  </span>
                </div>

                {/* Tools */}
                <div className="mb-4">
                  <div className="text-xs font-medium text-gray-600 mb-2">Tools:</div>
                  <div className="flex flex-wrap gap-1">
                    {caseItem.tools.slice(0, 3).map((toolId, idx) => (
                      <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {getToolName(toolId)}
                      </span>
                    ))}
                    {caseItem.tools.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        +{caseItem.tools.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats and Actions */}
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <button
                        onClick={() => handleLike(caseItem.id)}
                        className="flex items-center gap-1 hover:text-red-500 transition-colors"
                      >
                        <Heart className="h-4 w-4" />
                        {caseItem.likes || 0}
                      </button>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {caseItem.views || 0}
                      </div>
                    </div>
                    
                    {/* Share Menu */}
                    <div className="relative">
                      <button
                        onClick={() => setShowShareMenu(showShareMenu === caseItem.id ? null : caseItem.id)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                      
                      {showShareMenu === caseItem.id && (
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
                                onClick={() => handleShare(caseItem, platform.key)}
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
                  
                  <button
                    onClick={() => handleView(caseItem.id)}
                    className="btn-recommend w-full justify-center"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Case
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityCases; 