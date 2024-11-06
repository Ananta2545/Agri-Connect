// models/Crop.js
import mongoose from "mongoose";

const CropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  growthProgress: { type: Number, required: true },
  yieldData: [
    {
      month: { type: String, required: true },
      yield: { type: Number, required: true },
    },
  ],
  irrigationData: [{ type: mongoose.Schema.Types.ObjectId, ref: "Irrigation" }],// Reference to irrigation data
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

export default mongoose.model("Crop", CropSchema);
