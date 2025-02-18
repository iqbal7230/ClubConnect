// routes/eventRoutes.js
const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();

router.post('/events', eventController.createEvent);
router.get('/events', eventController.getEvents);
module.exports = router;