import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [authUser, setAuthUser] = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (isLoading) return; // Prevent multiple submissions
    
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };
    
    setIsLoading(true);
    console.log("Submitting signup data:", userInfo);
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, userInfo);
      console.log("Signup response:", res.data);
      
      if (res.data && res.data.user) {
        console.log("User data received:", res.data.user);
        toast.success("Signup Successfully");
        
        // Update authentication context (AuthProvider will handle localStorage)
        setAuthUser(res.data.user);
        console.log("AuthUser state updated with:", res.data.user);
        
        // Navigate after authentication state is updated
        setTimeout(() => {
          console.log("Navigating to:", from);
          navigate(from, { replace: true });
        }, 1000);
      } else {
        console.error("No user data in response:", res.data);
        toast.error("Signup failed - no user data received");
      }
    } catch (err) {
      if (err.response) {
        console.log("Signup error:", err);
        toast.error("Error: " + err.response.data.message);
      } else {
        console.log("Network error:", err);
        toast.error("Network error - please check your connection");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className=" w-[600px] ">
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* if there is a button in form, it will close the modal */}
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </Link>

              <h3 className="font-bold text-lg">Signup</h3>
              <div className="mt-4 space-y-2">
                <span>Name</span>
                <br />
                <input
                  type="text"
                  placeholder="Enter your fullname"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("fullname", { required: true })}
                />
                <br />
                {errors.fullname && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Email */}
              <div className="mt-4 space-y-2">
                <span>Email</span>
                <br />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("email", { required: true })}
                />
                <br />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Password */}
              <div className="mt-4 space-y-2">
                <span>Password</span>
                <br />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("password", { required: true })}
                />
                <br />
                {errors.password && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              {/* Button */}
              <div className="flex justify-around mt-4">
                <button 
                  type="submit"
                  disabled={isLoading}
                  className={`rounded-md px-3 py-1 duration-200 ${
                    isLoading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-pink-500 hover:bg-pink-700 cursor-pointer'
                  } text-white`}
                >
                  {isLoading ? "Signing up..." : "Signup"}
                </button>
                <p className="text-xl">
                  Go Back?{" "}
                  <Link
                    to="/"
                    className="underline text-blue-500 cursor-pointer"
                  >
                    GoBack
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
