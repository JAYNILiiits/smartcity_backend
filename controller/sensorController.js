const mongoose = require('mongoose');

// controllers/sensorController.js
const SensorData = require('../model/SensorData');

const sensorController = {
    createReading: async (req, res) => {
        try {
            const { distance, relayStatus } = req.body;
            const sensorData = new SensorData({
                distance,
                relayStatus
            });
            await sensorData.save();
            console.log(sensorData);
            
            req.app.get('wss').clients.forEach(client => {
                if (client.readyState === 1) {
                    client.send(JSON.stringify({
                        type: 'newReading',
                        data: sensorData
                    }));
                }
            });
            
            res.status(201).json(sensorData);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    getReadings: async (req, res) => {
        try {
            const limit = parseInt(req.query.limit) || 100;
            const readings = await SensorData.find()
                .sort({ timestamp: -1 })
                .limit(limit);
            res.json(readings);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getLatestReading: async (req, res) => {
        try {
            const reading = await SensorData.findOne()
                .sort({ timestamp: -1 });
            res.json(reading);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getReadingsByTimeRange: async (req, res) => {
        try {
            const { startTime, endTime } = req.query;
            const readings = await SensorData.find({
                timestamp: {
                    $gte: new Date(startTime),
                    $lte: new Date(endTime)
                }
            }).sort({ timestamp: -1 });
            res.json(readings);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = sensorController;