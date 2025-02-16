const mongoose = require("mongoose");

const UltrasonicSchema = new mongoose.Schema({
    distance: { type: Number, required: true },
    relayStatus: { type: String, enum: ["ON", "OFF"], required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("UltrasonicSensor", UltrasonicSchema);
