import express from 'express'
import { getExperts } from '../controllers/getExpertsController.js'

const router = express.Router();

router.get('/experts', getExperts);

export default router;