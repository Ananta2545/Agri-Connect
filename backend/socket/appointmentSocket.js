// socket/appointmentSocket.js
import User from '../models/auth.model.js';

export default function initAppointmentSocket(io) {
    io.on('connection', (socket) => {
        console.log("New user connected with socketId:", socket.id);

        // Event when user sets their socketId
        socket.on('setUser', async (userId) => {
            try {
                const user = await User.findById(userId);

                if (!user) {
                    console.error("User not found!");
                    return;
                }

                // Save socketId in the user document
                user.socketId = socket.id;
                if (!user.email) {
                    console.error("User email is missing, cannot update socketId.");
                    return;
                }

                await user.save();
                console.log(`Socket ID saved for user ${user.email}`);
            } catch (error) {
                console.error("Error saving socketId:", error.message);
            }
        });

        // Event when a user starts an appointment
        socket.on('start-appointment', (data) => {
            const { appointmentId } = data;
            socket.join(appointmentId);
            io.to(appointmentId).emit('appointment-started', { appointmentId });
        });

        // Event when a user joins an appointment
        socket.on('join-appointment', (data) => {
            const { appointmentId } = data;
            socket.join(appointmentId);
            io.to(appointmentId).emit('appointment-joined', { appointmentId });
        });

        // Handle disconnect
        socket.on('disconnect', () => {
            console.log(`User disconnected from appointment socket: ${socket.id}`);
        });
    });
}
