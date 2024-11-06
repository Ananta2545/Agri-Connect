// models/Irrigation.js
import mongoose from "mongoose";

const IrrigationSchema = new mongoose.Schema({
  crop: { type: mongoose.Schema.Types.ObjectId, ref: "Crop", required: true }, // Reference to the crop
  month: { type: String, required: true },
  waterUsage: { type: Number, required: true },
  forecastedUsage: { type: Number, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
});

export default mongoose.model("Irrigation", IrrigationSchema);
