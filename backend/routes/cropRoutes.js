import express from 'express'
import { addCrop, getAllCrops } from '../controllers/cropController.js';


const router = express.Router();

router.get("/", getAllCrops);
router.post("/add", addCrop);

export default router;
