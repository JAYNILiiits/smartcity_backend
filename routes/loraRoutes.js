const express = require("express");
const { receiveLoraData, getLoraData } = require("../controller/loraController");

const router = express.Router();

router.post("/data", receiveLoraData);
router.get("/data", getLoraData);

module.exports = router;
