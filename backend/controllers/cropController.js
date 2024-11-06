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

export const updateCrop = async(req, res)=>{
  const {id} = req.params;
  const {name, growthProgress, yieldData} = req.body;
  try{
    const crop = await Crop.findById(id);
    if(!crop) return res.status(404).json({message : "Crop not found"});
    if(name) crop.name = name;
    if(growthProgress !== undefined) crop.growthProgress = growthProgress;

    if(yieldData && yieldData.length > 0){
      crop.yieldData.push(...yieldData);
    }

    const updatedCrop = await crop.save();
    res.status(200).json(updatedCrop);
  }catch(err){
    res.status(500).json({message : "Failed to update crops"});
  }
}
