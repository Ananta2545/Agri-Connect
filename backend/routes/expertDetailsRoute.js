import express from 'express';
import { verifyToken } from '../middleware/jwt.js';
import {addExpertDetails, getExpertDetails, updateExpertDetails} from '../controllers/expertDetailsController.js'
import { getUserProfile } from '../controllers/authController.js';



const router = express.Router();

//profile route
router.get('/user/profile',verifyToken,getUserProfile)
// Get Expert Details (by userId from URL params)
router.get('/:userId',verifyToken, getExpertDetails);

// Add Expert Details (automatically sets userId from authenticated user)
router.post('/', verifyToken, addExpertDetails);

// Update Expert Details (by userId from URL params)
router.put('/:userId', verifyToken, updateExpertDetails);

export default router;
