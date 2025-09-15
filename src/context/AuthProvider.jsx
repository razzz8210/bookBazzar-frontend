import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { SESSION_CONFIG } from "../utils/sessionConfig";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Function to check if session is valid
  const isSessionValid = (loginTime, lastActivity) => {
    const now = new Date().getTime();
    const sessionExpired = (now - loginTime) > SESSION_CONFIG.SESSION_DURATION;
    const inactivityExpired = (now - lastActivity) > SESSION_CONFIG.INACTIVITY_DURATION;
    
    return !sessionExpired && !inactivityExpired;
  };

  // Function to logout user
  const logoutUser = (reason = "Session expired") => {
    setAuthUser(null);
    localStorage.removeItem("Users");
    localStorage.removeItem("userSession");
    toast.error(`${reason}. Please login again.`);
  };

  // Function to update last activity
  const updateLastActivity = () => {
    const session = localStorage.getItem("userSession");
    if (session) {
      try {
        const sessionData = JSON.parse(session);
        sessionData.lastActivity = new Date().getTime();
        localStorage.setItem("userSession", JSON.stringify(sessionData));
      } catch (error) {
        // Silent error handling for activity tracking
      }
    }
  };

  // Load user from localStorage on mount and check session validity
  useEffect(() => {
    const savedUser = localStorage.getItem("Users");
    const savedSession = localStorage.getItem("userSession");
    
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        
        // Validate user object has required fields
        if (parsedUser && parsedUser._id && (parsedUser.email || parsedUser.fullname)) {
          
          if (savedSession) {
            // User has session data - validate it
            const sessionData = JSON.parse(savedSession);
            if (isSessionValid(sessionData.loginTime, sessionData.lastActivity)) {
              setAuthUser(parsedUser);
              updateLastActivity(); // Update activity on app load
            } else {
              // Session expired, logout user
              logoutUser("Session expired");
            }
          } else {
            // User exists but no session data (legacy user or first time with session management)
            // Create new session for existing user
            const sessionData = {
              loginTime: new Date().getTime(),
              lastActivity: new Date().getTime()
            };
            localStorage.setItem("userSession", JSON.stringify(sessionData));
            setAuthUser(parsedUser);
          }
        } else {
          // Remove invalid user data
          localStorage.removeItem("Users");
          localStorage.removeItem("userSession");
        }
      } catch (error) {
        localStorage.removeItem("Users");
        localStorage.removeItem("userSession");
      }
    }
    
    // Mark initialization as complete
    setIsInitializing(false);
  }, []);

  // Update localStorage whenever authUser changes (but avoid interfering with initialization)
  useEffect(() => {
    // Skip localStorage operations during initial load to prevent race conditions
    if (isInitializing) {
      return;
    }
    
    if (authUser) {
      localStorage.setItem("Users", JSON.stringify(authUser));
      
      // Create session data only if it doesn't exist (new login)
      const existingSession = localStorage.getItem("userSession");
      if (!existingSession) {
        const sessionData = {
          loginTime: new Date().getTime(),
          lastActivity: new Date().getTime()
        };
        localStorage.setItem("userSession", JSON.stringify(sessionData));
      }
    } else {
      localStorage.removeItem("Users");
      localStorage.removeItem("userSession");
    }
  }, [authUser, isInitializing]);

  // Set up activity tracking
  useEffect(() => {
    const handleUserActivity = () => {
      if (authUser) {
        updateLastActivity();
      }
    };

    // Listen for user activity events
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, true);
    });

    // Clean up event listeners
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity, true);
      });
    };
  }, [authUser]);

  // Set up periodic session validation (check every 10 minutes)
  useEffect(() => {
    const checkSession = () => {
      if (authUser) {
        const savedSession = localStorage.getItem("userSession");
        if (savedSession) {
          try {
            const sessionData = JSON.parse(savedSession);
            if (!isSessionValid(sessionData.loginTime, sessionData.lastActivity)) {
              logoutUser("Session expired");
            }
          } catch (error) {
            // Silent error handling for session validation
            logoutUser("Session validation error");
          }
        }
      }
    };

    const interval = setInterval(checkSession, SESSION_CONFIG.CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, [authUser]);

  return (
    <AuthContext.Provider value={[authUser, setAuthUser, isInitializing]}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
