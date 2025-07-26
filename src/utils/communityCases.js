// Community Cases Management Utility

// Get all community cases
export function getCommunityCases() {
  try {
    const cases = localStorage.getItem('communityCases');
    return cases ? JSON.parse(cases) : [];
  } catch (error) {
    console.error('Error loading community cases:', error);
    return [];
  }
}

// Add a new community case
export function addCommunityCase(caseData) {
  try {
    const cases = getCommunityCases();
    const newCase = {
      ...caseData,
      id: `community-${Date.now()}`,
      created_at: new Date().toISOString(),
      approved: false, // New cases need approval
      likes: 0,
      views: 0
    };
    
    cases.unshift(newCase); // Add to beginning
    localStorage.setItem('communityCases', JSON.stringify(cases));
    return newCase;
  } catch (error) {
    console.error('Error adding community case:', error);
    throw error;
  }
}

// Update a community case
export function updateCommunityCase(caseId, updates) {
  try {
    const cases = getCommunityCases();
    const index = cases.findIndex(c => c.id === caseId);
    
    if (index !== -1) {
      cases[index] = { ...cases[index], ...updates };
      localStorage.setItem('communityCases', JSON.stringify(cases));
      return cases[index];
    }
    return null;
  } catch (error) {
    console.error('Error updating community case:', error);
    throw error;
  }
}

// Like a community case
export function likeCommunityCase(caseId) {
  try {
    const cases = getCommunityCases();
    const index = cases.findIndex(c => c.id === caseId);
    
    if (index !== -1) {
      cases[index].likes = (cases[index].likes || 0) + 1;
      localStorage.setItem('communityCases', JSON.stringify(cases));
      return cases[index];
    }
    return null;
  } catch (error) {
    console.error('Error liking community case:', error);
    throw error;
  }
}

// Increment views for a community case
export function incrementViews(caseId) {
  try {
    const cases = getCommunityCases();
    const index = cases.findIndex(c => c.id === caseId);
    
    if (index !== -1) {
      cases[index].views = (cases[index].views || 0) + 1;
      localStorage.setItem('communityCases', JSON.stringify(cases));
      return cases[index];
    }
    return null;
  } catch (error) {
    console.error('Error incrementing views:', error);
    throw error;
  }
}

// Generate social sharing URLs
export function generateSocialShareUrls(caseData, platform) {
  const baseUrl = window.location.origin;
  const caseUrl = `${baseUrl}/community-case/${caseData.id}`;
  const text = encodeURIComponent(`Check out this amazing tool stack for ${caseData.title}! 🚀`);
  
  const shareUrls = {
    whatsapp: `https://wa.me/?text=${text}%20${encodeURIComponent(caseUrl)}`,
    'whatsapp-business': `https://wa.me/?text=${text}%20${encodeURIComponent(caseUrl)}`,
    instagram: `https://www.instagram.com/`,
    messenger: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(caseUrl)}`,
    x: `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(caseUrl)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(caseUrl)}&title=${encodeURIComponent(caseData.title)}`,
    discord: `https://discord.com/channels/@me`
  };
  
  return shareUrls[platform] || caseUrl;
}

// Share to specific platform
export function shareToPlatform(caseData, platform) {
  const shareUrl = generateSocialShareUrls(caseData, platform);
  
  if (platform === 'discord') {
    // Discord doesn't support direct URL sharing, so copy to clipboard
    navigator.clipboard.writeText(`${caseData.title}: ${window.location.origin}/community-case/${caseData.id}`);
    return 'Copied to clipboard! Paste in Discord.';
  }
  
  window.open(shareUrl, '_blank', 'width=600,height=400');
  return 'Opened in new window';
}

// Get approved cases only
export function getApprovedCases() {
  const cases = getCommunityCases();
  return cases.filter(c => c.approved);
}

// Get cases by author
export function getCasesByAuthor(author) {
  const cases = getCommunityCases();
  return cases.filter(c => c.author === author);
} 