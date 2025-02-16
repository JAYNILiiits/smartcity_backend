const express = require("express");
const mongoose = require("./config/db");
const bodyParser = require("body-parser");

const loraRoutes = require("./routes/loraRoutes");
const ultrasonicRoutes = require("./routes/ultrasonicRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use("/lora", loraRoutes);
app.use("/ultrasonic", ultrasonicRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
