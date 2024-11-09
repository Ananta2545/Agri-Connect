// appointmentController.js

import Appointment from "../models/appointmentModel.js";
import User from "../models/auth.model.js";

// Booking an appointment
export const bookAppointment = async (req, res, io) => {
    try {
        const { expertId } = req.body;
        const farmerId = req.userId; // Get farmerId from the token

        const appointment = await Appointment.create({ farmerId, expertId });
        const expert = await User.findById(expertId);

        if (expert.socketId) {
            io.to(expert.socketId).emit('appointmentRequest', {
                appointMentId: appointment._id,
                farmerId: farmerId,
            });
        }

        res.status(200).json({ message: "Appointment request sent to expert" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while booking the appointment" });
    }
};

// Accept an appointment
export const acceptAppointment = async (req, res, io) => {
    try {
        const { appointmentId } = req.params;
        const appointment = await Appointment.findByIdAndUpdate(appointmentId, { status: 'accepted' }, { new: true });
        if (!appointment) return res.status(404).json({ error: "Appointment not found" });

        io.to(appointment.farmerId.toString()).emit('appointmentAccepted', { appointmentId });
        res.status(200).json({ message: "Appointment accepted successfully" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while accepting an appointment" });
    }
};

// Decline an appointment
export const declineAppointment = async (req, res, io) => {
    try {
        const { appointmentId } = req.params;
        const appointment = await Appointment.findByIdAndUpdate(appointmentId, { status: 'declined' }, { new: true });
        if (!appointment) return res.status(404).json({ error: "Appointment not found" });

        io.to(appointment.farmerId.toString()).emit('appointmentDeclined', { appointmentId });
        res.status(200).json({ message: "Appointment declined successfully" });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while declining the appointment" });
    }
};

// Get all appointments for expert
export const getAppointmentsForExpert = async (req, res) => {
    try {
        const expertId = req.userId; // Get expertId from the token
        const appointments = await Appointment.find({ expertId }).populate('farmerId', 'name'); // Assuming 'farmerId' contains the farmer's data like name
        if (!appointments) return res.status(404).json({ error: "No appointments found for this expert" });

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching appointments for expert" });
    }
};

// Get all appointments for farmer
export const getAppointmentsForFarmer = async (req, res) => {
    try {
        const farmerId = req.userId; // Get farmerId from the token
        const appointments = await Appointment.find({ farmerId }).populate('expertId', 'name'); // Assuming 'expertId' contains the expert's data like name
        if (!appointments) return res.status(404).json({ error: "No appointments found for this farmer" });

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching appointments for farmer" });
    }
};
