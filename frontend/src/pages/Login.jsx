import React, { useState ,useEffect } from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import "../index.css";
import GoogleLoginButton from "../components/GoogleLoginButton.jsx";
import { Link } from "react-router-dom";

function Login() {
  const [activeButton, setActiveButton] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "", username: "" });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const location = useLocation();


    // Check the pathname of the current URL and set the activeButton state
  useEffect(() => {
    // Check the pathname of the current URL and set the activeButton state
    if (location.pathname === "/login") {
      setActiveButton("login");
    } else if (location.pathname === "/signup") {
      setActiveButton("signup");
    }
  }, [location]);


  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      if (activeButton === "login") {
        // Call login API
        const response = await axios.post("http://localhost:8080/login", {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem("token", response.data.token); // Save token to localStorage
        setSuccessMessage("Login successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/home"; // Redirect to dashboard
        }, 2000);
      } else {
        // Call signup API
        const response = await axios.post("http://localhost:8080/signup", {
          
          email: formData.email,
          password: formData.password,
        });
        setSuccessMessage("Signup successful! You can now log in.");
        setActiveButton("login"); // Switch to login after signup
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-row bg-blue-600 w-screen h-screen">
      {/* Left Side Buttons */}
      <div className="w-7/12 bg-blue-600 flex flex-col items-end">
        <Link
          to="/login"
          onClick={() => {
            setActiveButton("login");
            setFormData({ ...formData, endpoint: "/login" });
          }}
          className={`relative my-2 p-3 top-52 w-40 right-0 rounded-l-[30px] text-white transition-all duration-300 transform ${
            activeButton === "login"
              ? "bg-blue-800 scale-105 shadow-lg"
              : "bg-blue-600 hover:scale-105"
          }`}
        >
          LOGIN
        </Link>
        <Link
          to="/signup"
          onClick={() => {
            setActiveButton("signup");
            setFormData({ ...formData, endpoint: "/signup" });
          }}
          className={`relative p-3 my-2 top-52 w-40 right-0 rounded-l-[30px] text-white transition-all duration-300 transform ${
            activeButton === "signup"
              ? "bg-blue-800 scale-105 shadow-lg"
              : "bg-blue-600 hover:scale-105"
          }`}
        >
          SIGNUP
        </Link>
      </div>

      {/* Right Side Content */}
      <div className="w-5/12 h-[85%] rounded-bl-[100px] bg-white p-8 overflow-hidden relative">
        <div className="relative h-full w-full flex justify-center">
          {activeButton === "login" ? (
            <form
              onSubmit={handleSubmit}
              className="absolute inset-0 animate-fadeIn transition-transform transform translate-x-0 duration-500 flex flex-col top-12 items-center"
              key="login"
            >
              <h2 className="text-2xl font-bold mb-6">Login</h2>
              <div className="mb-4">
                <label className="block mb-1 text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-96 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block mb-1 text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-96 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <a
                href="#"
                className="text-blue-600 text-sm hover:underline mb-4 inline-block"
              >
                Forgot Password?
              </a>
              <button
                type="submit"
                className="w-96 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
              >
                LOGIN
              </button>
              <div className="mt-4">
                <GoogleLoginButton />
              </div>
            </form>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="absolute inset-0 animate-fadeIn transition-transform transform translate-x-0 duration-500 flex flex-col top-12 items-center"
              key="signup"
            >
              <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
              <div className="mb-4">
                <label className="block mb-1 text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-96 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block mb-1 text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-96 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-96 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
              >
                SIGN UP
              </button>
              <div className="mt-4">
                <GoogleLoginButton />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
