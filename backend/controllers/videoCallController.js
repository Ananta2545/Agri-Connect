// controllers/videoCallController.js
export const startCall = (req, res) => {
    const { appointmentId } = req.body;
    res.status(200).json({ message: `Call started for appointment ${appointmentId}` });
};

export const joinCall = (req, res) => {
    const { appointmentId } = req.body;
    res.status(200).json({ message: `Farmer joined call for appointment ${appointmentId}` });
};
