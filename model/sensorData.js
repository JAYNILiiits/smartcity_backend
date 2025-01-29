const mongoose = require('mongoose');

let SensorData;

try {
    // First, try to get the existing model
    SensorData = mongoose.model('SensorData');
} catch (error) {
    // If model doesn't exist, create it
    const sensorDataSchema = new mongoose.Schema({
        distance: {
            type: Number,
            required: true
        },
        relayStatus: {
            type: String,
            enum: ['ON', 'OFF'],
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    });

    SensorData = mongoose.model('SensorData', sensorDataSchema);
}

module.exports = SensorData;