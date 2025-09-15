import React, { useEffect } from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import Cart from "./components/Cart";
import SessionWarning from "./components/SessionWarning";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";

function App() {
  const [authUser, setAuthUser, isInitializing] = useAuth();
  
  // Show loading spinner while authentication is being initialized
  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }
  
  return (
    <>
      <SessionWarning />
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/cart"
            element={authUser ? <Cart /> : <Navigate to="/signup" />}
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
