// controllers/cropController.js
import Crop from '../models/crop.model.js'
export const addCrop = async (req, res) => {
  try {
    const newCrop = new Crop(req.body);
    const savedCrop = await newCrop.save();
    res.status(201).json(savedCrop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.find().populate("irrigationData");
    res.status(200).json(crops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
