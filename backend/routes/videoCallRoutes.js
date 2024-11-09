import express from 'express';
import { startCall, joinCall } from '../controllers/videoCallController.js';

const router = express.Router();

router.post('/start', startCall);
router.post('/join', joinCall);

export default router;