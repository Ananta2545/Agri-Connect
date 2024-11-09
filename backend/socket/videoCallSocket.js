// videoCallSocket.js
import Appointment from "../models/appointmentModel.js";

const videoCallSocket = (io) => {
  // Listen for incoming socket connections
  io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle the join-call event
    socket.on('join-call', async ({ appointmentId, role }) => {
      console.log(`User with role ${role} is joining call for appointment ${appointmentId}`);

      // Find the appointment by ID
      const appointment = await Appointment.findById(appointmentId).populate('farmerId expertId');
      if (!appointment) {
        console.log(`Appointment not found: ${appointmentId}`);
        return;
      }

      if (role === 'farmer') {
        // Emit an event to the farmer and expert to notify they should join the call
        io.to(appointment.expertId.socketId).emit('join-call', {
          appointmentId,
          role: 'expert',
          message: 'Farmer is ready to join the call!',
        });

        socket.join(appointmentId); // Join the socket room
      } else if (role === 'expert') {
        // Emit an event to the farmer and expert to notify they should join the call
        io.to(appointment.farmerId.socketId).emit('join-call', {
          appointmentId,
          role: 'farmer',
          message: 'Expert is ready to join the call!',
        });

        socket.join(appointmentId); // Join the socket room
      }
    });

    // Handle disconnect event
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

export default videoCallSocket;
