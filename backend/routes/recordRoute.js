import express from 'express'
import { addRecord, calculateMonthlySummary, getMonthlySummary, } from '../controllers/recordController.js';
import { verifyToken } from '../middleware/jwt.js';

const router = express.Router();

router.post('/add',verifyToken, addRecord);
router.post('/calculate-summary',verifyToken, calculateMonthlySummary);  // Endpoint to calculate and store monthly summary
router.get('/summary/:year',verifyToken, getMonthlySummary); // Endpoint to get all summaries for a specific year


export default router;
