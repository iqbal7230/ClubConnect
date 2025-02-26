// controllers/eventController.js
import Event from '../models/Event.js';
import cloudinary from '../utils/cloudinary.js';

export const createEvent = async (req, res) => {
  try {
    const {
      name,
      institution,
      date,
      time,
      isFree,
      price,
      description,
      clubName,
      performer
    } = req.body;

    
    if (!name || !institution || !date || !time || !description || !clubName) {
      return res.status(400).json({
        message: 'Please provide all required fields'
      });
    }

    // Validate time format
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(time)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid time format. Please use HH:mm format (e.g., 14:30)'
      });
    }

    // Upload images to Cloudinary
    const uploadPromises = req.files.map(async (file) => {
      const b64 = Buffer.from(file.buffer).toString('base64');
      const dataURI = `data:${file.mimetype};base64,${b64}`;
      
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'events',
        resource_type: 'auto'
      });

      return {
        public_id: result.public_id,
        url: result.secure_url
      };
    });

    const imageUrls = await Promise.all(uploadPromises);

    const event = new Event({
      name,
      institution,
      date: new Date(date),
      clubName,
      performer,
      time,
      isFree: isFree === 'true',
      price: isFree === 'true' ? 0 : parseFloat(price),
      description,
      images: imageUrls
    });

    await event.save();

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: event
    });

  } catch (error) {
    // Delete uploaded images if event creation fails
    if (req.files) {
      for (const file of req.files) {
        if (file.public_id) {
          await cloudinary.uploader.destroy(file.public_id);
        }
      }
    }

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Add the getEvents function
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
