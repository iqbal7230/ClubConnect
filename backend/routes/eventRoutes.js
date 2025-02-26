
import express from 'express';
const router = express.Router();


import { createEvent, getEvents,toggleLike,getTopLikedEvents} from '../controllers/eventController.js';
import { upload } from '../utils/multer.js';


router.post('/create', upload.array('images', 3), createEvent);
router.get('/getEvent', getEvents);
router.post('/like/:eventId', toggleLike);
router.get('/top-events', getTopLikedEvents);



export default router;