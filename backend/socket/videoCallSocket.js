export default function initVideoCallSocket(io) {
    io.on('connection', (socket) => {
      console.log(`User connected to video call: ${socket.id}`);
  
      socket.on('join-call', (data) => {
        const { appointmentId } = data;
        console.log('Join call event received:', appointmentId);
        socket.join(appointmentId);
        io.to(appointmentId).emit('join-call', { appointmentId });
      });
  
      socket.on('signal', (data) => {
        const { appointmentId, signalData } = data;
        socket.to(appointmentId).emit('signal', { signalData });
      });
  
      socket.on('disconnect', () => {
        console.log(`User disconnected from video call socket: ${socket.id}`);
      });
    });
  }
  