const express = require('express');
const router = express.Router();
const sensorController = require('../controller/sensorController');

router.post('/readings', sensorController.createReading);
router.get('/readings', sensorController.getReadings);
router.get('/readings/latest', sensorController.getLatestReading);
router.get('/readings/range', sensorController.getReadingsByTimeRange);

module.exports = router;