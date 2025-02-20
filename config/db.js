require("dotenv").config();
const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected to Atlas"))
    .catch(err => console.log("MongoDB Connection Error:", err));

module.exports = mongoose;
