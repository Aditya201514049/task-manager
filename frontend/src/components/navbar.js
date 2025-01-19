
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, handleLogout, user }) => {
  const [showUserDetails, setShowUserDetails] = useState(false);

  const toggleUserDetails = () => {
    setShowUserDetails((prevState) => !prevState);
  };

  return (
    <nav className="bg-blue-500 p-4">
      {/* Title Div */}
      <div className="text-center mb-4">
        <h1 className="text-white text-2xl font-bold">Task Manager</h1>
      </div>

      {/* Buttons and Links Div */}
      <div className="flex justify-center space-x-6">
        {isLoggedIn ? (
          <>
            <Link
              to="/"
              className="text-white hover:text-gray-300 font-medium"
            >
              Task Form
            </Link>
            <Link
              to="/tasks"
              className="text-white hover:text-gray-300 font-medium"
            >
              Task List
            </Link>
            <button
              onClick={toggleUserDetails}
              className="text-white hover:text-gray-300 font-medium"
            >
             {user ? user.name : "Guest"}
            </button>
            <button
              onClick={handleLogout}
              className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
            {showUserDetails && user && (
              <div className="absolute top-24 right-4 bg-white text-black p-4 rounded shadow-lg">
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
            <Link
              to="/login"
              className="text-white hover:text-gray-300 font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-white hover:text-gray-300 font-medium"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

