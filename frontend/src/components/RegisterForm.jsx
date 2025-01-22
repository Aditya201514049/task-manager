

import React, { useState } from "react";
import axios from "axios";

const RegisterForm = ({ onRegisterSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name,
          email,
          password,
        }
      );
      if (response.status === 201) {
        alert("Registration successful!");
        setName("");
        setEmail("");
        setPassword("");
        onRegisterSuccess && onRegisterSuccess(); // Notify parent component if provided
      }
    } catch (err) {
      console.error("Registration Error:", err);
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="max-w-md mx-auto bg-gradient-to-br from-green-100 to-green-200 p-8 rounded-xl shadow-lg"
    >
      <h2 className="text-3xl font-extrabold mb-6 text-green-700 text-center">
        Create Your Account
      </h2>
      {error && (
        <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
      )}
      <div className="mb-6">
        <label className="block text-green-900 font-medium mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Your full name"
          className="input input-bordered w-full px-4 py-2 border-2 border-green-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>
      <div className="mb-6">
        <label className="block text-green-900 font-medium mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="example@domain.com"
          className="input input-bordered w-full px-4 py-2 border-2 border-green-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>
      <div className="mb-6">
        <label className="block text-green-900 font-medium mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter a strong password"
          className="input input-bordered w-full px-4 py-2 border-2 border-green-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`btn w-full py-3 mt-4 text-white text-lg font-semibold rounded-md ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-300"
        }`}
      >
        {loading ? "Registering..." : "Register"}
      </button>
      <p className="text-sm text-center text-green-700 mt-4">
        Already have an account?{" "}
        <a
          href="/login"
          className="font-semibold text-green-800 underline hover:text-green-600"
        >
          Login here
        </a>
      </p>
    </form>
  );
};

export default RegisterForm;

