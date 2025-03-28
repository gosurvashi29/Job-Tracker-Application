const Profile = require("../models/profileModel")
require('dotenv').config();
const User = require("../models/userModel")


exports.addProfile=async (req, res) => {
    try{
  const { name, email, phone, career_goals } = req.body;


    
      const newProfile = await Profile.create({
        name:name, 
        email :email, 
        phone:phone,
    career_goals:career_goals,
    user_id:req.user.id});
    
    res.status(200).json({
        profileData: newProfile
    });
}catch(err){  
    console.error('Error saving profile:', err);
    return res.status(500).json({ error: 'Failed to save profile.' });}
  
}

exports.getProfile=async(req, res) => {

    try{
   

    const profile= await Profile.findOne({
        where:{user_id:req.user.id}
    })

   
 
    res.status(200).json({ profileData:profile})
}catch(err){console.error('Error fetching profile:', err);
    return res.status(500).json({ error: 'Failed to fetch profile.' });}
}
