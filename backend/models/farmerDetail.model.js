// models/FarmerDetails.js

import mongoose from 'mongoose';

const farmerDetailsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true, // Ensure each user can have only one farmer detail record
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    climate: {
        type: String,
        required: true,
    },
    cropNames: [{
        type: String,
    }],
    amountOfLand: {
        type: Number,
        required: true,
    },
    otherDetails: {
        type: String,
    }
}, {
    timestamps: true,
});

export default mongoose.model('FarmerDetails', farmerDetailsSchema);
