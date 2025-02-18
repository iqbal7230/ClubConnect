// controllers/eventController.js
const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    const event = new Event(req.body);
    await event.save();
    res.status(201).send(event);
};

exports.getEvents = async (req, res) => {
    const events = await Event.find().populate('addedBy');
    res.send(events);
};