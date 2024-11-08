import express from 'express';
import { verifyToken } from '../middleware/jwt.js';
import { getUserProfile } from '../controllers/authController.js';
import { addFarmerDetails, getFarmerDetails, updateFarmerDetails } from '../controllers/farmerDetailsController.js';

const router = express.Router()

//profile route 
router.get('/user/profile',verifyToken,getUserProfile)

//get farmer details
router.get('/:userId',verifyToken,getFarmerDetails)

//add farmer details
router.post('/',verifyToken,addFarmerDetails)

//Update farmer details 

router.put('/:userId',verifyToken,updateFarmerDetails)


export default router