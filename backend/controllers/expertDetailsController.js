import ExpertDetails from '../models/expertDetail.model.js';
import User from '../models/auth.model.js';

// Get Expert Details
export const getExpertDetails = async (req, res) => {
  try {
    const expertDetails = await ExpertDetails.findOne({ userId: req.params.userId });
    
    // If expert details are not found, return default values
    if (!expertDetails) {
      const defaultDetails = {
        expertStats: { successfulAppointments: 0, farmersHelped: 0, experience: 0, rating: 0 },
        appointmentStats: { 
          totalAppointments: 0, 
          satisfactionRating: 0, 
          adviceAreas: { cropManagement: 0, pestControl: 0, irrigation: 0 } 
        },
        blogEngagement: { views: 0, comments: 0, likes: 0 }
      };
      return res.status(200).json(defaultDetails);
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
    // Try to find the expert details for the given userId
    let expertDetails = await ExpertDetails.findOne({ userId: req.params.userId });

    // If expert details don't exist, create a new document for this user
    if (!expertDetails) {
      expertDetails = new ExpertDetails({
        userId: req.params.userId,
        expertStats: {
          successfulAppointments: 0,
          farmersHelped: 0,
          experience: 0,
          rating: 0
        },
        appointmentStats: {
          totalAppointments: 0,
          satisfactionRating: 0,
          adviceAreas: {
            cropManagement: 0,
            pestControl: 0,
            irrigation: 0
          }
        },
        blogEngagement: {
          views: 0,
          comments: 0,
          likes: 0
        }
      });
    }

    // Update the expert details with the values from the request body, if provided
    const { expertStats, appointmentStats, blogEngagement } = req.body;

    if (expertStats) {
      expertDetails.expertStats = {
        ...expertDetails.expertStats.toObject(),
        ...expertStats
      };
    }
    
    if (appointmentStats) {
      expertDetails.appointmentStats = {
        ...expertDetails.appointmentStats.toObject(),
        ...appointmentStats
      };
    }
    
    if (blogEngagement) {
      expertDetails.blogEngagement = {
        ...expertDetails.blogEngagement.toObject(),
        ...blogEngagement
      };
    }

    // Save the updated expert details
    await expertDetails.save();

    // Respond with the updated expert details
    res.status(200).json(expertDetails);

  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: 'Server Error', error });
  }
};
