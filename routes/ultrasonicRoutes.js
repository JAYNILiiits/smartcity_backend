const express = require("express");
const { receiveUltrasonicData, getUltrasonicData } = require("../controller/ultrasonicController");

const router = express.Router();

router.post("/data", receiveUltrasonicData);
router.get("/data", getUltrasonicData);

module.exports = router;
