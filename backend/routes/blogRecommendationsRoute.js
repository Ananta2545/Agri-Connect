import express from 'express';
import { getBlogRecommendations } from '../controllers/blogRecommendationsController.js';

const router = express.Router();

// Define the route for expert recommendations
router.get('/blog-recommendations', getBlogRecommendations);

export default router;
