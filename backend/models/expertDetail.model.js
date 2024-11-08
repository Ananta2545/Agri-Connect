import mongoose from 'mongoose';

const expertDetailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  expertStats: {
    successfulAppointments: { type: Number, default: 0 },
    farmersHelped: { type: Number, default: 0 },
    experience: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
  appointmentStats: {
    totalAppointments: { type: Number, default: 0 },
    satisfactionRating: { type: Number, default: 0 },
    adviceAreas: {
      cropManagement: { type: Number, default: 0 },
      pestControl: { type: Number, default: 0 },
      irrigation: { type: Number, default: 0 },
    },
  },
  blogEngagement: {
    views: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
  },
}, { timestamps: true });

export default mongoose.model('ExpertDetails', expertDetailsSchema);
