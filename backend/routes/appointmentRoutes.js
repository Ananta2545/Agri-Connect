// appointmentRoutes.js

import express from 'express';
import { bookAppointment, acceptAppointment, declineAppointment, getAppointmentsForExpert, getAppointmentsForFarmer } from '../controllers/appointmentController.js';
import { verifyToken } from '../middleware/jwt.js';

const router = express.Router();

// Apply the verifyToken middleware to the book route
router.post('/book', verifyToken, (req, res) => bookAppointment(req, res, req.app.get('socketio')));
router.post('/:appointmentId/accept', verifyToken, (req, res) => acceptAppointment(req, res, req.app.get('socketio')));
router.post('/:appointmentId/decline', verifyToken, (req, res) => declineAppointment(req, res, req.app.get('socketio')));

// Route to get all appointments for expert
router.get('/expert', verifyToken, getAppointmentsForExpert);

// Route to get all appointments for farmer
router.get('/farmer', verifyToken, getAppointmentsForFarmer);

export default router;
