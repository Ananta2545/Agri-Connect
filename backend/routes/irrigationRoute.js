// routes/irrigation.js
import express from 'express';
import { addIrrigationData, getAllIrrigationDataByCrop } from '../controllers/irrigationController.js';

const router = express.Router();

// Dynamic route to add irrigation data for a specific crop
router.post("/:cropId/add", addIrrigationData);

// Route to get all irrigation data for a specific crop
router.get("/:cropId", getAllIrrigationDataByCrop);

export default router;
