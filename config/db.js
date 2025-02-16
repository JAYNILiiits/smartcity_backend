const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/sensorDB"; 

mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB Connection Error:", err));

module.exports = mongoose;
