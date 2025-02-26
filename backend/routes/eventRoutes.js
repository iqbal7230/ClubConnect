<<<<<<< HEAD

import express from 'express';
const router = express.Router();


import { createEvent, getEvents,toggleLike,getTopLikedEvents} from '../controllers/eventController.js';
=======
// routes/eventRoutes.js
import {createEvent, getEvents} from '../controller/eventController.js'// Make sure the path is correct
>>>>>>> ba77b29eb95db4879d6cab8497c83b4649356ff4
import { upload } from '../utils/multer.js';
import { Router } from 'express';
const EventRouter = Router();

EventRouter.post('/create', upload.array('images', 3), createEvent);
EventRouter.get('/getEvent', getEvents);

<<<<<<< HEAD
router.post('/create', upload.array('images', 3), createEvent);
router.get('/getEvent', getEvents);
router.post('/like/:eventId', toggleLike);
router.get('/top-events', getTopLikedEvents);



export default router;
=======
export default EventRouter;
>>>>>>> ba77b29eb95db4879d6cab8497c83b4649356ff4
