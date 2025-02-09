
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config/config.js");

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();
const app = express();

// ✅ CORS Setup (Same as Chat App)
app.use(cors({ origin: ["https://task-manager-1-6ubf.onrender.com", "http://localhost:3000"] }));

// ✅ Middleware
app.use(express.json()); // Parse JSON requests

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// ✅ Root Route (For Testing)
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
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
