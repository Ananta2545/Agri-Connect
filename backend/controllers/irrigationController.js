// controllers/irrigationController.js
import Irrigation from '../models/irrigation.model.js';

export const addIrrigationData = async (req, res) => {
  const { cropId } = req.params;
  const { month, waterUsage, forecastedUsage } = req.body;

  try {

    const userId = req.userId;
    // Create and save new irrigation data associated with the crop
    const irrigationData = new Irrigation({
      crop: cropId,
      user: userId,
      month,
      waterUsage,
      forecastedUsage,
    });
    await irrigationData.save();

    res.status(201).json({ message: 'Irrigation data added successfully', irrigationData });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add irrigation data', error });
  }
};

// Optional: Controller to get all irrigation data for a specific crop
export const getAllIrrigationDataByCrop = async (req, res) => {
  const { cropId } = req.params;
  try {
    const userId = req.userId;
    const irrigationData = await Irrigation.find({ crop: cropId, user: userId });
    res.status(200).json(irrigationData);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve irrigation data', error });
  }
};
