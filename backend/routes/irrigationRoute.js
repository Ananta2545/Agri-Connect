// routes/irrigation.js
import express from 'express';
import { addIrrigationData, getAllIrrigationDataByCrop } from '../controllers/irrigationController.js';
import { verifyToken } from '../middleware/jwt.js';

const router = express.Router();

// Dynamic route to add irrigation data for a specific crop
router.post("/:cropId/add",verifyToken, addIrrigationData);

// Route to get all irrigation data for a specific crop
router.get("/:cropId",verifyToken, getAllIrrigationDataByCrop);

export default router;
