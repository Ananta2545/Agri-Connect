import mongoose from 'mongoose'

const recordSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    expenditure: { type: Number, required: true },
    earnings: { type: Number, required: true },
    month: {
        type: Number,  
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true,
      }
  });
  
export default mongoose.model('Record', recordSchema);