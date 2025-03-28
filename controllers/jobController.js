const JobApplication = require("../models/jobApplicationModel");
const User = require("../models/userModel")
const File = require("../models/fileModel")
const path = require("path");
const fs = require("fs");
require('dotenv').config();
const express= require("express");
const AWS = require('aws-sdk');


exports.saveJobApplication = async (req, res) => {
  try {
    
    const { jobTitle, applicationDate, status, notes,company_name } = req.body.formData;
 
 
      
      const newApplication =await JobApplication.create({
        job_title:jobTitle,
        company_name:company_name,
        status: status,
        application_date: applicationDate,
        notes: notes,
        user_id:req.user.id
        
      })
        
          res.status(200).json({
            message: 'Job application saved successfully!',
            application: newApplication,
          });
    
    
  } catch (err) {
    console.error('Error processing job application:', err);
    res.status(500).json({ error: 'Server error.' });
  }
};


exports.getJobApplications = async (req, res) => {
  try {
    const userId = req.user.id;
    const applications = await JobApplication.findAll({where:{user_id:userId}});
    res.status(200).json({
      applications,
    });
  } catch (err) {
    console.error('Error fetching job applications:', err);
    res.status(500).json({ error: 'Failed to fetch job applications.' });
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