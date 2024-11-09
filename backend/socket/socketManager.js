// socket/socketManager.js
import initVideoCallSocket from './videoCallSocket.js';
import initAppointmentSocket from './appointmentSocket.js';

export default function socketManager(io) {
    // Initialize socket logic for video calls
    initVideoCallSocket(io);

    // Initialize socket logic for appointment bookings
    initAppointmentSocket(io);
}
