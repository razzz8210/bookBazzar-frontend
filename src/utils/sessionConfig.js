// Session configuration settings
export const SESSION_CONFIG = {
  // Maximum session duration (7 days)
  SESSION_DURATION: 7 * 24 * 60 * 60 * 1000,
  
  // Maximum inactivity period (24 hours)
  INACTIVITY_DURATION: 24 * 60 * 60 * 1000,
  
  // How often to check session validity (10 minutes)
  CHECK_INTERVAL: 10 * 60 * 1000,
  
  // Warning time before session expires (30 minutes)
  WARNING_TIME: 30 * 60 * 1000
};

// Helper functions for session management
export const formatTimeRemaining = (milliseconds) => {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

export const getSessionTimeRemaining = () => {
  const savedSession = localStorage.getItem("userSession");
  if (!savedSession) return 0;
  
  try {
    const sessionData = JSON.parse(savedSession);
    const now = new Date().getTime();
    const sessionTimeLeft = SESSION_CONFIG.SESSION_DURATION - (now - sessionData.loginTime);
    const activityTimeLeft = SESSION_CONFIG.INACTIVITY_DURATION - (now - sessionData.lastActivity);
    
    // Return the smaller of the two (whichever expires first)
    return Math.min(sessionTimeLeft, activityTimeLeft);
  } catch (error) {
    return 0;
  }
};
