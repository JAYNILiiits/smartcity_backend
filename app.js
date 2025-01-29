const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const connectDB = require('./config/database');
const env = require('dotenv').config();


const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// First connect to database
connectDB().then(() => {
    // Only import models and routes after DB connection
    const SensorData = require('./model/SensorData');
    const sensorRoutes = require('./routes/sensorRoutes');

    app.set('wss', wss);

    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Logging middleware for all requests
    app.use((req, res, next) => {
        console.log('\n=== HTTP Request ===');
        console.log(`Time: ${new Date().toISOString()}`);
        console.log(`Method: ${req.method}`);
        console.log(`Path: ${req.path}`);
        console.log('Body:', req.body);
        next();
    });

    // Routes
    app.use('/api', sensorRoutes);

    // WebSocket connection handling
    wss.on('connection', (ws) => {
        const clientId = Math.random().toString(36).substring(7);
        console.log(`\n=== New WebSocket Client Connected ===`);
        console.log(`Client ID: ${clientId}`);
        console.log(`Time: ${new Date().toISOString()}`);
        console.log(`Active Connections: ${wss.clients.size}`);

        ws.on('message', async (message) => {
            try {
                const data = JSON.parse(message);
                console.log('\n=== WebSocket Message Received ===');
                console.log(`Time: ${new Date().toISOString()}`);
                console.log(`Client ID: ${clientId}`);
                console.log('Data:', {
                    distance: data.distance,
                    relayStatus: data.relayStatus
                });

                const sensorData = new SensorData({
                    distance: data.distance,
                    relayStatus: data.relayStatus
                });
                await sensorData.save();
                console.log('Data saved to database successfully');

                // Broadcast to all clients
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            type: 'newReading',
                            data: sensorData
                        }));
                    }
                });
                console.log(`Data broadcast to ${wss.clients.size} clients`);

            } catch (error) {
                console.error('\n=== WebSocket Error ===');
                console.error(`Time: ${new Date().toISOString()}`);
                console.error(`Client ID: ${clientId}`);
                console.error('Error:', error.message);
            }
        });

        ws.on('close', () => {
            console.log(`\n=== WebSocket Client Disconnected ===`);
            console.log(`Client ID: ${clientId}`);
            console.log(`Time: ${new Date().toISOString()}`);
            console.log(`Remaining Connections: ${wss.clients.size}`);
        });
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error('\n=== Server Error ===');
        console.error(`Time: ${new Date().toISOString()}`);
        console.error('Error:', err.stack);
        res.status(500).json({ error: 'Something went wrong!' });
    });

    const PORT = process.env.PORT;
    server.listen(PORT, () => {
        console.log('\n=== Server Started ===');
        console.log(`Time: ${new Date().toISOString()}`);
        console.log(`Server running on port ${PORT}`);
    });
});