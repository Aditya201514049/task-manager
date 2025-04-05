import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ isLoggedIn, handleLogout, user }) => {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const mobileDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);

  // Handle click outside for dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen && 
        mobileDropdownRef.current && 
        !mobileDropdownRef.current.contains(event.target) &&
        mobileMenuButtonRef.current && 
        !mobileMenuButtonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDetails(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setShowUserDetails(false); // Close user dropdown when mobile menu opens
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleUserDetails = () => {
    setShowUserDetails((prev) => !prev);
    setIsMobileMenuOpen(false); // Close mobile menu when user dropdown opens
  };

  return (
    <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full shadow-lg z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Task Manager</h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg text-white ${
                  location.pathname === "/"
                    ? "bg-blue-500 hover:bg-blue-600 border-2 border-blue-500"
                    : "hover:border-2 hover:border-blue-500"
                }`}
              >
                Task Form
              </Link>

              <Link
                to="/tasks"
                className={`px-4 py-2 rounded-lg text-white ${
                  location.pathname === "/tasks"
                    ? "bg-green-500 hover:bg-green-600 border-2 border-green-500"
                    : "hover:border-2 hover:border-green-500"
                }`}
              >
                Task List
              </Link>

              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={toggleUserDetails}
                  className={`px-4 py-2 rounded-lg text-white ${
                    showUserDetails
                      ? "bg-yellow-500 hover:bg-yellow-600 border-2 border-yellow-500"
                      : "hover:border-2 hover:border-yellow-500"
                  }`}
                >
                  {user?.name || "Guest"}
                </button>

                {showUserDetails && user && (
                  <div className="absolute top-12 right-0 bg-white text-black p-4 rounded shadow-lg w-56">
                    <div className="mb-4">
                      <p className="font-bold text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setShowUserDetails(false)}
                      className="block w-full py-2 px-3 text-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
                    >
                      View Profile
                    </Link>
                  </div>
                )}
              </div>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`px-4 py-2 rounded-lg text-white ${
                  location.pathname === "/login"
                    ? "bg-indigo-500 hover:bg-indigo-600 border-2 border-indigo-500"
                    : "hover:border-2 hover:border-indigo-500"
                }`}
              >
                Login
              </Link>

              <Link
                to="/register"
                className={`px-4 py-2 rounded-lg text-white ${
                  location.pathname === "/register"
                    ? "bg-purple-500 hover:bg-purple-600 border-2 border-purple-500"
                    : "hover:border-2 hover:border-purple-500"
                }`}
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden relative">
          <button
            ref={mobileMenuButtonRef}
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none p-2 rounded-lg hover:bg-gray-700"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <div
              ref={mobileDropdownRef}
              className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-20"
            >
              <div className="flex flex-col p-2 space-y-2">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/"
                      onClick={closeMenu}
                      className={`px-4 py-2 text-white rounded-lg ${
                        location.pathname === "/" ? "bg-blue-500" : "hover:bg-gray-600"
                      }`}
                    >
                      Task Form
                    </Link>
                    <Link
                      to="/tasks"
                      onClick={closeMenu}
                      className={`px-4 py-2 text-white rounded-lg ${
                        location.pathname === "/tasks" ? "bg-green-500" : "hover:bg-gray-600"
                      }`}
                    >
                      Task List
                    </Link>
                    <div className="px-4 py-2 text-white border-t border-gray-600">
                      <p className="font-bold">{user?.name || "Guest"}</p>
                      <p className="text-sm text-gray-300">{user?.email}</p>
                      <Link
                        to="/profile"
                        onClick={closeMenu}
                        className="mt-2 block w-full py-1.5 px-2 text-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm"
                      >
                        View Profile
                      </Link>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMenu();
                      }}
                      className="px-4 py-2 text-left text-red-400 hover:bg-gray-600 rounded-lg"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className={`px-4 py-2 text-white rounded-lg ${
                        location.pathname === "/login" ? "bg-indigo-500" : "hover:bg-gray-600"
                      }`}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={closeMenu}
                      className={`px-4 py-2 text-white rounded-lg ${
                        location.pathname === "/register" ? "bg-purple-500" : "hover:bg-gray-600"
                      }`}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;