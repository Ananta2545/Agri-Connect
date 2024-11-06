import express from 'express'
import { getFarmingAlerts } from '../controllers/notificationsController.js'

const router = express.Router()

router.get('/farming-notifications',getFarmingAlerts)

export default router