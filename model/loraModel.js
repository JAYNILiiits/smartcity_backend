const mongoose = require("mongoose");

const LoraSchema = new mongoose.Schema({
    waterLevel: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("LoraSensor", LoraSchema);
