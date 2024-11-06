import express from 'express'
import { addCrop, getAllCrops, updateCrop } from '../controllers/cropController.js';
// import { verify } from 'jsonwebtoken';
import { verifyToken } from '../middleware/jwt.js';


const router = express.Router();

router.get("/",verifyToken, getAllCrops);
router.post("/add",verifyToken, addCrop);
router.patch("/update/:id",verifyToken, updateCrop);

export default router;
