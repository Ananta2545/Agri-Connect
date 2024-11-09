import Appointment from "../models/appointmentModel.js";

const videoCallSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle the join-call event
    socket.on('join-call', async ({ appointmentId, role }) => {
      console.log(`User with role ${role} is joining call for appointment ${appointmentId}`);

      const appointment = await Appointment.findById(appointmentId).populate('farmerId expertId');
      if (!appointment) {
        console.log(`Appointment not found: ${appointmentId}`);
        return;
      }

      if (role === 'farmer') {
        io.to(appointment.expertId.socketId).emit('join-call', {
          appointmentId,
          role: 'expert',
          message: 'Farmer is ready to join the call!',
        });
        socket.join(appointmentId); // Join the socket room
      } else if (role === 'expert') {
        io.to(appointment.farmerId.socketId).emit('join-call', {
          appointmentId,
          role: 'farmer',
          message: 'Expert is ready to join the call!',
        });
        socket.join(appointmentId); // Join the socket room
      }
    });

    // Handle the video call offer (from farmer to expert)
    socket.on('video-call-offer', (offerData) => {
      const { appointmentId, offer, role } = offerData;
      const targetRole = role === 'farmer' ? 'expert' : 'farmer';

      // Send the offer to the other user (expert or farmer)
      io.to(appointmentId).emit('video-call-offer', {
        offer,
        appointmentId,
        role: targetRole,
      });
    });

    // Handle the video call answer (from expert to farmer)
    socket.on('video-call-answer', (answerData) => {
      const { appointmentId, answer, role } = answerData;
      const targetRole = role === 'farmer' ? 'expert' : 'farmer';

      // Send the answer to the other user (expert or farmer)
      io.to(appointmentId).emit('video-call-answer', {
        answer,
        appointmentId,
        role: targetRole,
      });
    });

    // Handle ICE candidates
    socket.on('ice-candidate', (candidateData) => {
      const { appointmentId, candidate, role } = candidateData;
      const targetRole = role === 'farmer' ? 'expert' : 'farmer';

      // Send the ICE candidate to the other user (expert or farmer)
      io.to(appointmentId).emit('ice-candidate', {
        candidate,
        appointmentId,
        role: targetRole,
      });
    });

    // Handle disconnect event
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

export default videoCallSocket;
