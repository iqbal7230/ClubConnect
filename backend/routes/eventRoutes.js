// routes/eventRoutes.js
import {createEvent, getEvents} from '../controller/eventController.js'// Make sure the path is correct
import { upload } from '../utils/multer.js';
import { Router } from 'express';
const EventRouter = Router();

EventRouter.post('/create', upload.array('images', 3), createEvent);
EventRouter.get('/getEvent', getEvents);

export default EventRouter;
