

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/authUtils";

const LoginForm = ({ setIsLoggedIn, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userData = await loginUser(email, password); // Utility function
      if (userData) {
        setUser(userData); // Update user state in App.js
        setIsLoggedIn(true); // Update parent state
        navigate("/"); // Redirect to TaskForm page
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md mx-auto bg-gradient-to-br from-blue-100 to-blue-200 p-8 rounded-xl shadow-lg"
    >
      <h2 className="text-3xl font-extrabold mb-6 text-blue-700 text-center">
        Welcome Back!
      </h2>
      {error && (
        <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
      )}
      <div className="mb-6">
        <label className="block text-blue-900 font-medium mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
          className="input input-bordered w-full px-4 py-2 border-2 border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div className="mb-6">
        <label className="block text-blue-900 font-medium mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
          className="input input-bordered w-full px-4 py-2 border-2 border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`btn w-full py-3 mt-4 text-white text-lg font-semibold rounded-md ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
        }`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      <p className="text-sm text-center text-blue-700 mt-4">
        Don't have an account?{" "}
        <a
          href="register"
          className="font-semibold text-blue-800 underline hover:text-blue-600"
        >
          Register here
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
