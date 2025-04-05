import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/authUtils";
import { Link } from "react-router-dom";

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
      className="max-w-md mx-auto bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-indigo-900 p-8 rounded-xl shadow-lg transition-colors duration-200"
    >
      <h2 className="text-3xl font-extrabold mb-6 text-blue-700 dark:text-blue-300 text-center">
        Welcome Back!
      </h2>
      {error && (
        <p className="text-red-500 dark:text-red-400 mb-4 text-center font-medium">{error}</p>
      )}
      <div className="mb-6">
        <label className="block text-blue-900 dark:text-blue-300 font-medium mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
          className="input input-bordered w-full px-4 py-2 border-2 border-blue-400 dark:border-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-200"
        />
      </div>
      <div className="mb-6">
        <label className="block text-blue-900 dark:text-blue-300 font-medium mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
          className="input input-bordered w-full px-4 py-2 border-2 border-blue-400 dark:border-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors duration-200"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`btn w-full py-3 mt-4 text-white text-lg font-semibold rounded-md ${
          loading
            ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
        } transition-colors duration-200`}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      <p className="text-sm text-center text-blue-700 dark:text-blue-300 mt-4">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-green-800 dark:text-green-400 underline hover:text-green-600 dark:hover:text-green-300"
        >
          Register here
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
