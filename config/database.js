const mongoose = require('mongoose');
const env = require('dotenv').config();

const MONGO = process.env.MONGO;
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;