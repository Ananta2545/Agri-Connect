import express from 'express'
import { addRecord, calculateMonthlySummary, getMonthlySummary, } from '../controllers/recordController.js';

const router = express.Router();

router.post('/add', addRecord);
router.post('/calculate-summary', calculateMonthlySummary);  // Endpoint to calculate and store monthly summary
router.get('/summary/:year', getMonthlySummary); // Endpoint to get all summaries for a specific year


export default router;
