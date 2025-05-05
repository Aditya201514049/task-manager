# Task Manager Application

## Overview
The Task Manager is a full-stack web application designed to help users manage their tasks efficiently. It allows users to create, update, delete, and view tasks. The application also supports user authentication and provides a responsive user interface with light and dark mode themes.

## Features
- User authentication (register, login, and logout)
- Create, update, delete, and view tasks
- Filter and sort tasks by status, priority, and search query
- Responsive design with light and dark mode
- Secure API with JWT-based authentication

## Technologies Used
### Frontend
- React
- React Router
- Tailwind CSS
- DaisyUI
- Axios
- Day.js

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- bcrypt.js

## Folder Structure
```
backend/
  index.js
  package.json
  config/
    config.js
  controllers/
    taskController.js
    userController.js
  middleware/
    authMiddleware.js
  models/
    taskModel.js
    User.js
  routes/
    taskRoutes.js
    userRoutes.js
frontend/
  package.json
  README.md
  public/
    index.html
    _redirects
  src/
    App.jsx
    App.css
    components/
      Footer.jsx
      LoginForm.jsx
      RegisterForm.jsx
      TaskForm.jsx
      TaskList.jsx
      ThemeToggle.jsx
      navbar.jsx
    context/
      ThemeContext.jsx
    pages/
      About.jsx
      FAQs.jsx
      Privacy.jsx
      Profile.jsx
      Terms.jsx
    services/
      taskService.jsx
    utils/
      authUtils.jsx
```

## Installation

### Prerequisites
- Node.js
- MongoDB

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=<your_mongo_connection_string>
   JWT_SECRET=<your_jwt_secret>
   JWT_EXPIRATION=1h
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` directory and add the following:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```
4. Start the frontend development server:
   ```bash
   npm start
   ```

## Deployment
### Backend
The backend can be deployed to platforms like Render or Heroku. Ensure the environment variables are set correctly on the deployment platform.

### Frontend
The frontend can be deployed to platforms like Netlify or Vercel. Ensure the `REACT_APP_API_URL` points to the deployed backend URL.

## API Endpoints
### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user
- `GET /api/users/me` - Get the logged-in user's profile

### Task Routes
- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - Get all tasks for the logged-in user
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Environment Variables
### Backend
- `PORT`: Port number for the backend server
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT
- `JWT_EXPIRATION`: Expiration time for JWT tokens

### Frontend
- `REACT_APP_API_URL`: URL of the backend API

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the ISC License.