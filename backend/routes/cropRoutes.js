import express from 'express'
import { addCrop, getAllCrops, updateCrop } from '../controllers/cropController.js';


const router = express.Router();

router.get("/", getAllCrops);
router.post("/add", addCrop);
router.patch("/update/:id", updateCrop);

export default router;
