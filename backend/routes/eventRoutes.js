// routes/eventRoutes.js
import express from 'express';
const router = express.Router();
import {createEvent, getEvents} from '../controller/eventController.js'// Make sure the path is correct
import { upload } from '../utils/multer.js';

const EventRouter = express.Router();

router.post('/create', upload.array('images', 3), createEvent);
router.get('/getEvent', getEvents);

export default EventRouter;
