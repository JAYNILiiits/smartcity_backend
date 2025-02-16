const LoraSensor = require("../model/loraModel");

exports.receiveLoraData = async (req, res) => {
    try {
        const { waterLevel } = req.body;
        if (waterLevel === undefined) {
            return res.status(400).json({ error: "waterLevel is required" });
        }

        const newEntry = new LoraSensor({ waterLevel });
        await newEntry.save();

        res.status(201).json({ message: "LoRa data stored successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getLoraData = async (req, res) => {
    try {
        const data = await LoraSensor.find().sort({ timestamp: -1 });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
