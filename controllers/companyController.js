const Company = require("../models/companyModel");
const Reminder = require("../models/reminderModel");
const JobListing = require("../models/jobListingModel")
const User = require("../models/userModel")
const JobApplication = require("../models/jobApplicationModel");
const File = require("../models/fileModel")
const path = require("path");
const fs = require("fs");
require('dotenv').config();
const express= require("express");
const AWS = require('aws-sdk');


exports.saveCompany = async (req, res) => {
  try {
    
    const { companyName,
        contactInfo,
        companySize,
        industry,
        companyNotes } = req.body.formData;
 
 
      
      const newCompany =await Company.create({
        company_name:companyName,
        contact_details: contactInfo,
        industry: industry,
        company_size:companySize,
        notes: companyNotes
        
        
      })
        
          res.status(200).json({
            message: 'Company Details saved successfully!',
            company: newCompany,
          });
    
    
  } catch (err) {
    console.error('Error processing company details:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};

exports.saveJobListing = async (req, res) => {
    try {
      
      const { jobTitle,
        companyName,
        listingNotes } = req.body.formData;
   
   
        
        const newJobListing =await JobListing.create({
            jobtitle:jobTitle,
            company:companyName,
            notes:listingNotes,
            user_id : req.user.id
          
          
        })
          
            res.status(200).json({
              message: 'JobListing saved successfully!',
              JobListing: newJobListing,
            });
      
      
    } catch (err) {
      console.error('Error processing JobListing:', err);
      res.status(500).json({ error: 'Server error.' });
    }
  };

  exports.saveReminder = async (req, res) => {
    try {
      
      const {reminder_date,
        reminder_message} = req.body.formData;
   
        console.log(req.body.formData)
        
        const newReminder =await Reminder.create({
            reminder_date:reminder_date,
        reminder_message:reminder_message,
        user_id:req.user.id
          
          
        })
        
            res.status(200).json({
              message: 'Reminder saved successfully!',
              Reminder: newReminder,
            });
      
      
    } catch (err) {
      console.error('Error processing Reminder:', err);
      res.status(500).json({ error: 'Server error.' });
    }
  };



exports.getCompanies = async (req, res) => {
  try {
    const userId = req.user.id;
    const companies = await Company.findAll({
        attributes: ['company_name'] 
      });
    res.status(200).json({
      companies,
    });

    
  } catch (err) {
    console.error('Error fetching job listings:', err);
    res.status(500).json({ error: 'Failed to fetch job listings.' });
  }
};

exports.uploadFiles = async (req, res) => {
    try {
        
        const { message } = req.body;
        const userId = req.user.id;

        const name = await User.findOne({
            where: { id:userId}
        });
        
        const filePath=message
        const data = fs.createReadStream(filePath);

        // Generate unique key for the file as bucket does versioning
        const fileName = `job-${name.username}-${Date.now()}`;


        const uploadResult = await uploadToS3(data, fileName);
        console.log(uploadResult)
        const newMessage = await File.create({
            file_type:fileName,
            file_path:message,
            user_id:userId
            
        });

        res.status(201).json({ message: newMessage });
    } catch (err) {
        console.error('Error Uploading:', err);
        res.status(500).json({ error: 'Failed to Upload' });
    }
};



async function uploadToS3(data, fileName){ 
    const s3bucket = new AWS.S3({
        accessKeyId: process.env.IAM_USER_KEY, 
        secretAccessKey: process.env.IAM_USER_SECRET,
        bucket_name: process.env.BUCKET_NAME
    });

    s3bucket.createBucket(()=>{
        var params={
            Bucket : process.env.BUCKET_NAME,
            Key : fileName,
            Body : data,
            ACL: "public-read"
        }
        return new Promise((resolve, reject)=>{
        s3bucket.upload(params,(err,s3response)=>{
            if(err){
                console.log("cant upload to s3", err)
                reject(err)
            }
            else{
                console.log("upload to s3 success", s3response.Location)
                resolve(s3response.Location)
            }
        })
    })
    })

}