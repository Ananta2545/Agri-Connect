import FarmerDetails from "../models/farmerDetail.model.js";
import User from '../models/auth.model.js'

//getting farmer details by id
export const getFarmerDetails = async (req, res) => {
    try {
      const farmerDetails = await FarmerDetails.findOne({ user: req.params.userId });
      if (!farmerDetails) {
        return res.status(404).json({ message: 'Farmer details not found' });
      }
      res.status(200).json(farmerDetails);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  };

//adding farmer details
export const addFarmerDetails = async(req,res)=>{
    try{
        const userId = req.userId
        const {phone, address, region, climate, cropNames, amountOfLand, otherDetails}= req.body

        const user = await User.findById(userId)
        if(!user || user.role!=='farmer'){
            return res.status(400).json({message:"Invalid expert user ID"})
        }

        const existingDetails = await FarmerDetails.findOne({userId})
        if(existingDetails){
            return res.status(400).json({message:'Farmer details already exist'})
        }

        const newFarmerDetails = new FarmerDetails({
            user: userId,
            phone,
            address,
            region,
            climate,
            cropNames,
            amountOfLand,
            otherDetails
        })
        await newFarmerDetails.save()
        res.status(201).json(newFarmerDetails)

    }catch(error){
    res.status(500).json({ message: 'Server Error', error });
    }
} 

export const updateFarmerDetails = async (req, res) => {
    try {
        // Find the farmer's details based on the userId in the URL
        const farmerDetails = await FarmerDetails.findOne({ user: req.params.userId });
        if (!farmerDetails) {
            return res.status(404).json({ message: "Farmer details not found" });
        }

        // Destructure fields from the request body
        const { phone, address, region, climate, cropNames, amountOfLand, otherDetails } = req.body;

        // Update fields only if they are provided and different from the existing values
        if (phone && phone !== farmerDetails.phone) {
            farmerDetails.phone = phone;
        }
        if (address && address !== farmerDetails.address) {
            farmerDetails.address = address;
        }
        if (region && region !== farmerDetails.region) {
            farmerDetails.region = region;
        }
        if (climate && climate !== farmerDetails.climate) {
            farmerDetails.climate = climate;
        }
        if (cropNames && JSON.stringify(cropNames) !== JSON.stringify(farmerDetails.cropNames)) {
            farmerDetails.cropNames = cropNames;
        }
        if (amountOfLand && amountOfLand !== farmerDetails.amountOfLand) {
            farmerDetails.amountOfLand = amountOfLand;
        }
        if (otherDetails && otherDetails !== farmerDetails.otherDetails) {
            farmerDetails.otherDetails = otherDetails;
        }

        // Save the updated farmer details
        await farmerDetails.save();

        res.status(200).json({ message: "Farmer details updated successfully", farmerDetails });
    } catch (error) {
        res.status(500).json({ message: "Error updating farmer details", error });
    }
};
