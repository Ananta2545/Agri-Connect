import express from 'express'
import { getRecommendations } from '../controllers/recommendationController.js';
import { verifyToken } from '../middleware/jwt.js';


const router = express.Router();

router.post('/recommendations', getRecommendations);

export default router
