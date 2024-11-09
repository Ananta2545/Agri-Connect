import User from '../models/auth.model.js';

const socketManager = (io)=>{
    io.on('connection', (socket) => {
        console.log("New user connected with socketId:", socket.id);
    
        // Assuming you have a way to get userId from the token or a different method
        socket.on('setUser', async (userId) => {
            try {
                // Ensure that the userId is valid and exists
                const user = await User.findById(userId);
    
                if (!user) {
                    console.error("User not found!");
                    return;
                }
    
                // Update the user document with the new socketId
                user.socketId = socket.id;  // Save socketId for this user
    
                // Ensure the email is not null before saving
                if (!user.email) {
                    console.error("User email is missing, cannot update socketId.");
                    return;
                }
    
                // Save updated user document
                await user.save();
                console.log(`Socket ID saved for user ${user.email}`);
            } catch (error) {
                console.error("Error saving socketId:", error.message);
            }
        });
    
        // Handle socket disconnect
        socket.on('disconnect', () => {
            console.log("User disconnected", socket.id);
        });
    });
}

export default socketManager;