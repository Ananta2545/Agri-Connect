import ExpertDetails from '../models/expertDetail.model.js';
import User from '../models/auth.model.js';

// Get Expert Details
export const getExpertDetails = async (req, res) => {
  try {
    const expertDetails = await ExpertDetails.findOne({ userId: req.params.userId });
    if (!expertDetails) {
      return res.status(404).json({ message: 'Expert details not found' });
    }
    res.status(200).json(expertDetails);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Add Expert Details
export const addExpertDetails = async (req, res) => {
  try {
    const userId = req.userId; // Use authenticated user's ID
    const { expertStats, appointmentStats, blogEngagement } = req.body;

    // Check if the user exists and is an expert
    const user = await User.findById(userId);
    if (!user || user.role !== 'expert') {
      return res.status(400).json({ message: 'Invalid expert user ID' });
    }

    // Check if expert details already exist
    const existingDetails = await ExpertDetails.findOne({ userId });
    if (existingDetails) {
      return res.status(400).json({ message: 'Expert details already exist' });
    }

    const newExpertDetails = new ExpertDetails({
      userId,
      expertStats,
      appointmentStats,
      blogEngagement,
    });

    await newExpertDetails.save();
    res.status(201).json(newExpertDetails);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update Expert Details
export const updateExpertDetails = async (req, res) => {
  try {
    const expertDetails = await ExpertDetails.findOne({ userId: req.params.userId });
    if (!expertDetails) {
      return res.status(404).json({ message: 'Expert details not found' });
    }

    // Only update fields if they are provided in the request body
    const { expertStats, appointmentStats, blogEngagement } = req.body;

    if (expertStats) {
      expertDetails.expertStats = { ...expertDetails.expertStats.toObject(), ...expertStats };
    }

    if (appointmentStats) {
      expertDetails.appointmentStats = { ...expertDetails.appointmentStats.toObject(), ...appointmentStats };
    }

    if (blogEngagement) {
      expertDetails.blogEngagement = { ...expertDetails.blogEngagement.toObject(), ...blogEngagement };
    }

    await expertDetails.save();
    res.status(200).json(expertDetails);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
