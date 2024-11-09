// socket/videoCallSocket.js
export default function initVideoCallSocket(io) {
    io.on('connection', (socket) => {
        console.log(`User connected to video call: ${socket.id}`);

        // Event when user starts a call
        socket.on('start-call', (data) => {
            const { appointmentId } = data;
            socket.join(appointmentId);
            io.to(appointmentId).emit('call-started', { appointmentId });
        });

        // Event when user joins a call
        socket.on('join-call', (data) => {
            const { appointmentId } = data;
            socket.join(appointmentId);
            io.to(appointmentId).emit('call-joined', { appointmentId });
        });

        // Signal event for sending data between participants
        socket.on('signal', (data) => {
            const { appointmentId, signalData } = data;
            socket.to(appointmentId).emit('signal', { signalData });
        });

        // Handle disconnect
        socket.on('disconnect', () => {
            console.log(`User disconnected from video call socket: ${socket.id}`);
        });
    });
}
