import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Profile from "./pages/Profile";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const [user, setUser] = useState(null); // Store logged-in user data
  const [taskListKey, setTaskListKey] = useState(0); // Key to force TaskList re-render
  const [token, setToken] = useState("");

  const navigate = useNavigate(); // Use navigate instead of window.location.href

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
      
      // Fetch user data using the token
      const fetchUser = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/me`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            // If token is invalid, log the user out
            handleLogout();
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // If there's an error, log the user out
          handleLogout();
        }
      };
      
      fetchUser();
    }
  }, []); // Only run once on component mount

  // Refresh the task list when a task is added
  const handleSave = () => {
    console.log("Task saved! Refreshing task list...");
    setTaskListKey((prevKey) => prevKey + 1); // Update key to force re-render
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Logout action
    setUser(null); // Clear user data
    localStorage.removeItem("authToken"); // Clear token (if stored)
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} user={user} />

      <div className="pt-16">
        <Routes>
          {isLoggedIn ? (
            <>
              <Route
                path="/"
                element={<TaskForm onSave={handleSave} user={user} token={token} />}
              />
              <Route
                path="/tasks"
                element={<TaskList key={taskListKey} user={user} token={token} />}
              />
              <Route
                path="/profile"
                element={<Profile user={user} token={token} />}
              />
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/register" element={<Navigate to="/" />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route
                path="/login"
                element={<LoginForm setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}
              />
              <Route
                path="/register"
                element={
                  <RegisterForm
                    onRegisterSuccess={() => {
                      alert("Registration successful! Please log in.");
                      navigate("/login"); // Redirect using navigate
                    }}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;

