/*
const dotenv = require("dotenv"); // Import dotenv
dotenv.config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");  // Import CORS
const config = require("./config/config.js");

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();


// Allow requests from both localhost and the network IP
const corsOptions = {
    origin: ['https://task-manager-1995.onrender.com'], // Add your network device's IP address here if needed
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,  // Enable cookies if needed
  };
  
  app.use(cors(corsOptions)); // Apply the CORS middleware

// Middleware to parse JSON requests
app.use(express.json());

// Use the user routes
app.use('/api/users', userRoutes);

// Task routes
app.use("/api/tasks", taskRoutes);



// Basic route for testing

app.get('/',(req, res)=>{
    res.send("Task Manager API is running ...");
} );

// connect to MongoDB
mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true, // Parses connection string
    useUnifiedTopology: true, // Enables the new Server Discover and Monitoring engine
    serverSelectionTimeoutMS: 10000, // Wait up to 10 seconds for server selection
})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => {
        console.error("MongoDB connection error:", err.message);
        process.exit(1); // Exit process if connection fails
    });

// Start the server
const PORT = config.PORT || 5000;
const HOST = '0.0.0.0'; // Makes the server accessible on the local network
app.listen(PORT, HOST, () => {
    console.log(`Server running on port ${PORT}`);
});

*/

const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config/config.js");

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// ✅ CORS FIX: Explicitly allow frontend & handle preflight requests
const corsOptions = {
    origin: ["https://task-manager-1995.onrender.com", "http://localhost:3000"], // Allow frontend URLs
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies/tokens if needed
};
app.use(cors(corsOptions));

// ✅ Ensure every request has the required CORS headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://task-manager-1995.onrender.com");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200); // Preflight request success
    }
    next();
});

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// ✅ Basic API Test Route
app.get("/", (req, res) => {
    res.send("Task Manager API is running...");
});

// ✅ Connect to MongoDB
mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    });

// ✅ Start Server
const PORT = config.PORT || 5000;
const HOST = "0.0.0.0"; // Allow external access
app.listen(PORT, HOST, () => {
    console.log(`Server running on port ${PORT}`);
});
