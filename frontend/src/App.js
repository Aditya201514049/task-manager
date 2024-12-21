
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar"; // Import the Navbar component
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import LoginForm from "./components/LoginForm"; // Corrected import for LoginForm
import RegisterForm from "./components/RegisterForm"; // Corrected import for RegisterForm

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const [user, setUser] = useState(null); // Store logged-in user data
  const [taskListKey, setTaskListKey] = useState(0); // Key to force TaskList re-render
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  // Update the token when localStorage changes
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    setToken(storedToken);
  }, []);

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

    // Handle successful login
    const handleLogin = (loggedInUser, token) => {
      setIsLoggedIn(true); // Set login state to true
      setUser(loggedInUser); // Set user data
      localStorage.setItem("authToken", token); // Store token (if needed)
    };

  return (
    <Router>
      <div>
        
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} user={user} />

        
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<TaskForm onSave={handleSave} user={user} />} />
              <Route path="/tasks" element={<TaskList key={taskListKey} user={user} token={token} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route
                path="/login"
                element={<LoginForm setIsLoggedIn={handleLogin} setUser={setUser}/>}
              />
              <Route
                path="/register"
                element={
                  <RegisterForm
                    onRegisterSuccess={() => {
                      alert("Registration successful! Please log in.");
                      window.location.href = "/login"; // Redirect to login
                    }}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

