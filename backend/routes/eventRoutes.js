// routes/eventRoutes.js
import {auth} from '../middleware/authmiddleware.js'

import {createEvent, getEvents,likeEvent, getLikeStatus} from '../controllers/eventController.js'// Make sure the path is correct
import { upload } from '../utils/multer.js';
import { Router } from 'express';
const EventRouter = Router();

EventRouter.post('/create', upload.array('images', 3), createEvent);
EventRouter.get('/getEvent', getEvents);
EventRouter.post('/:id/like',auth, likeEvent);
EventRouter.get('/:id/like',  auth, getLikeStatus);



export default EventRouter;
