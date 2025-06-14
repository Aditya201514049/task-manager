import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Profile from "./pages/Profile";
import About from "./pages/About";
import FAQs from "./pages/FAQs";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const [user, setUser] = useState(null); // Store logged-in user data
  const [taskListKey, setTaskListKey] = useState(0); // Key to force TaskList re-render
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const navigate = useNavigate(); // Use navigate instead of window.location.href
  const location = useLocation(); // Get current location

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
        } finally {
          setIsLoading(false); // Set loading to false when done
        }
      };
      
      fetchUser();
    } else {
      setIsLoading(false); // Also set loading to false if no token
    }
  }, []); // Only run once on component mount
  
  // Effect to handle persistence of protected routes after refresh
  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      // Get the current path and store it for after login
      const currentPath = location.pathname;
      localStorage.setItem('lastPath', currentPath);
    }
  }, [location.pathname, isLoggedIn, isLoading]);

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

  // If loading, show a loading indicator
  if (isLoading) {
    return (
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col transition-colors duration-200">
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} user={user} />

      <div className="pt-16 flex-grow">
        <Routes>
          {/* Public routes accessible to all users */}
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Protected and authentication routes */}
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
                element={
                  <LoginForm 
                    setIsLoggedIn={setIsLoggedIn} 
                    setUser={setUser} 
                    onLoginSuccess={() => {
                      // Restore last path after login if available
                      const lastPath = localStorage.getItem('lastPath');
                      if (lastPath && ['/tasks', '/profile'].includes(lastPath)) {
                        navigate(lastPath);
                      } else {
                        navigate('/');
                      }
                    }}
                  />
                }
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

      <Footer />
    </div>
  );
};

const AppWrapper = () => {
  return (
    <ThemeProvider>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  );
};

export default AppWrapper;
//main app component

