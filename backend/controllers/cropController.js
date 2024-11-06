import Crop from '../models/crop.model.js';

export const addCrop = async (req, res) => {
  try {
    console.log("User ID:", req.userId);  // Log the user ID for debugging
    const newCrop = new Crop({
      ...req.body,
      user: req.userId,  // Make sure req.userId is set by the middleware
    });
    
    const savedCrop = await newCrop.save();
    res.status(201).json(savedCrop);
  } catch (error) {
    res.status(500).json({ message: "Error occurred while adding crop", error });
  }
};

export const getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.find({ user: req.userId }).populate("irrigationData");
    res.status(200).json(crops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCrop = async (req, res) => {
  const { id } = req.params;
  const { name, growthProgress, yieldData } = req.body;
  try {
    const crop = await Crop.findOne({ _id: id, user: req.userId });
    if (!crop) return res.status(404).json({ message: "Crop not found" });
    
    if (name) crop.name = name;
    if (growthProgress !== undefined) crop.growthProgress = growthProgress;

    // Ensure yieldData is an array of objects with "month" and "yield"
    if (Array.isArray(yieldData) && yieldData.every(item => item.month && item.yield)) {
      crop.yieldData.push(...yieldData);
    }

    const updatedCrop = await crop.save();
    res.status(200).json(updatedCrop);
  } catch (err) {
    res.status(500).json({ message: "Failed to update crop", error: err.message });
  }
};
