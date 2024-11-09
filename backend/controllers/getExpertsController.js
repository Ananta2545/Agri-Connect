import User from '../models/auth.model.js'

// controller to get all expert user
export const getExperts = async(req, res)=>{
    try{
        const experts = await User.find({role: 'expert'});
        res.status(200).json(experts);
    }catch(err){
        res.status(500).json({message : "Failed to fetch the user details", err});
    }
}