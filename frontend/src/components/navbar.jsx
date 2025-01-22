import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ isLoggedIn, handleLogout, user }) => {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const location = useLocation(); // Get current route path

  const toggleUserDetails = () => {
    setShowUserDetails((prevState) => !prevState);
  };

  return (
    <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full shadow-lg z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section - Title */}
        <h1 className="text-white text-2xl font-bold">Task Manager</h1>

        {/* Right Section - Buttons */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              {/* Task Form Button */}
              <Link
                to="/"
                className={`btn ${
                  location.pathname === "/" ? "btn-active" : ""
                } bg-blue-500 hover:bg-blue-600 text-white`}
              >
                Task Form
              </Link>

              {/* Task List Button */}
              <Link
                to="/tasks"
                className={`btn ${
                  location.pathname === "/tasks" ? "btn-active" : ""
                } bg-green-500 hover:bg-green-600 text-white`}
              >
                Task List
              </Link>

              {/* Username Button */}
              <button
                onClick={toggleUserDetails}
                className="btn bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                {user ? user.name : "Guest"}
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="btn bg-red-500 hover:bg-red-600 text-white"
              >
                Logout
              </button>

              {/* User Details Dropdown */}
              {showUserDetails && user && (
                <div className="absolute top-16 right-4 bg-white text-black p-4 rounded shadow-lg">
                  <p>
                    <strong>Name:</strong> {user.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Login Button */}
              <Link
                to="/login"
                className={`btn ${
                  location.pathname === "/login" ? "btn-active" : ""
                } bg-indigo-500 hover:bg-indigo-600 text-white`}
              >
                Login
              </Link>

              {/* Register Button */}
              <Link
                to="/register"
                className={`btn ${
                  location.pathname === "/register" ? "btn-active" : ""
                } bg-purple-500 hover:bg-purple-600 text-white`}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
