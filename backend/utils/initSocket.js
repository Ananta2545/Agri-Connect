// utils/socket.js
export default function initSocket(io) {
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on('start-call', (data) => {
            const { appointmentId } = data;
            socket.join(appointmentId);
            io.to(appointmentId).emit('call-started', appointmentId); // Ensure event is sent to the specific room
        });

        socket.on('join-call', (data) => {
            const { appointmentId } = data;
            socket.join(appointmentId);
            io.to(appointmentId).emit('call-joined', { appointmentId });
        });

        socket.on('signal', (data) => {
            const { appointmentId, signalData } = data;
            socket.to(appointmentId).emit('signal', { signalData });
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
}
