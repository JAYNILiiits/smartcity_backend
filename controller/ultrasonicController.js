const UltrasonicSensor = require("../model/ultrasonicModel");

exports.receiveUltrasonicData = async (req, res) => {
    try {
        const { distance, relayStatus } = req.body;
        if (distance === undefined || !["ON", "OFF"].includes(relayStatus)) {
            return res.status(400).json({ error: "Invalid data format" });
        }

        const newEntry = new UltrasonicSensor({ distance, relayStatus });
        await newEntry.save();

        res.status(201).json({ message: "Ultrasonic data stored successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getUltrasonicData = async (req, res) => {
    try {
        const data = await UltrasonicSensor.find().sort({ timestamp: -1 });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
