


// Helper function to check if the token is expired
export const isTokenExpired = (token) => {
  if (!token) return true; // Treat missing token as expired
  try {
    const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the token payload
    const exp = decoded.exp;
    return Date.now() >= exp * 1000; // Compare current time with expiry
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // Treat malformed token as expired
  }
};

// Get the token from localStorage
const getToken = () => {
  const token = localStorage.getItem('authToken');
  if (isTokenExpired(token)) {
    console.error('Token is expired or invalid');
    return null;
  }
  return token;
};

// API call to create a new task
export const createTask = async (taskData) => {
  const token = getToken();
  if (!token) throw new Error('Authorization token is missing or expired');

  const response = await fetch('http://localhost:5000/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Include the token in the header
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to create task: ${errorMessage}`);
  }

  return await response.json(); // Return the created task
};

// API call to fetch all tasks
export const getTasks = async () => {
  const token = getToken();
  if (!token) throw new Error('Authorization token is missing or expired');

  const response = await fetch('http://localhost:5000/api/tasks', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to fetch tasks: ${errorMessage}`);
  }

  return await response.json(); // Return the list of tasks
};

// API call to update a task
export const updateTask = async (taskId, taskData) => {
  const token = getToken();
  if (!token) throw new Error('Authorization token is missing or expired');

  const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to update task: ${errorMessage}`);
  }

  return await response.json(); // Return the updated task
};

// API call to delete a task
export const deleteTask = async (taskId) => {
  const token = getToken();
  if (!token) throw new Error('Authorization token is missing or expired');

  const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to delete task: ${errorMessage}`);
  }

  return await response.json(); // Return the response
};
