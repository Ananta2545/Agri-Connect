import mongoose from "mongoose";
const monthlySummarySchema = new mongoose.Schema({
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    totalEarnings: {
      type: Number,
      default: 0,
    },
    totalExpenditure: {
      type: Number,
      default: 0,
    },
    revenue: {
      type: Number,
      default: 0,
    },
  });
  
export default mongoose.model('MonthlySummary',monthlySummarySchema)