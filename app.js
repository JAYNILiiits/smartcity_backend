const express = require("express");
const mongoose = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const loraRoutes = require("./routes/loraRoutes");
const ultrasonicRoutes = require("./routes/ultrasonicRoutes");

const app = express();
const PORT = process.env.PORT;

// Enable CORS to allow cross-device access
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());

// Logging Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - IP: ${req.ip}`);
    if (Object.keys(req.body).length) {
        console.log("Body:", JSON.stringify(req.body, null, 2));
    }
    next();
});

// Routes
app.use("/lora", loraRoutes);
app.use("/ultrasonic", ultrasonicRoutes);

// Start the server on 0.0.0.0 (for local network access)
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://10.2.0.182:${PORT}`);
});
