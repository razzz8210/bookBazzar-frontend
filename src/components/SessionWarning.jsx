import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { SESSION_CONFIG, getSessionTimeRemaining, formatTimeRemaining } from "../utils/sessionConfig";
import toast from "react-hot-toast";

function SessionWarning() {
  const [authUser] = useAuth();
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!authUser) {
      setShowWarning(false);
      return;
    }

    const updateTimeRemaining = () => {
      const remaining = getSessionTimeRemaining();
      setTimeRemaining(remaining);
      
      // Show warning if less than 30 minutes remaining
      if (remaining > 0 && remaining <= SESSION_CONFIG.WARNING_TIME) {
        setShowWarning(true);
      } else {
        setShowWarning(false);
      }
    };

    // Update immediately
    updateTimeRemaining();

    // Update every minute
    const interval = setInterval(updateTimeRemaining, 60 * 1000);

    return () => clearInterval(interval);
  }, [authUser]);

  // Show toast warning when session is about to expire
  useEffect(() => {
    if (showWarning && timeRemaining > 0) {
      const timeLeft = formatTimeRemaining(timeRemaining);
      toast(`⚠️ Session expires in ${timeLeft}. Activity will extend your session.`, {
        duration: 5000,
        style: {
          background: '#f59e0b',
          color: 'white',
        },
      });
    }
  }, [showWarning, timeRemaining]);

  // Don't render anything visible (component just manages warnings)
  return null;
}

export default SessionWarning;
