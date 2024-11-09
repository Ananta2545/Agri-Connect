import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema({
    farmerId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true
    },
    expertId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true
    },
    status:{
        type: String,
        enum:[
            'pending', 'accepted', 'declined'
        ],
        default: 'pending'
    },
    date:{
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

export default mongoose.model('Appointment', appointmentSchema);