import express from 'express'
import { getFarmingNews } from '../controllers/farmingNewsController.js';


const router = express.Router();

router.get('/farming_news', getFarmingNews);

export default router;