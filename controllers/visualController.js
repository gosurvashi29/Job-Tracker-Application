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

const Sequelize = require("sequelize");
const sequelize = require("../util/database");


exports.getStats = async (req, res) => {
    try {
        const stats = await JobApplication.findAll({
            where: { user_id: req.user.id },
            attributes: [
                'status', 
                [sequelize.fn('COUNT', sequelize.col('status')), 'count']
            ],
            group: ['status']
        });

        const statusData = stats.map(stat => ({
            status: stat.status,
            count: stat.get('count')
        }));

        

        res.json({ statusData });
    } catch (error) {
        console.error('Error fetching application stats:', error);
        res.status(500).send('Error fetching application stats');
    }
};

exports.appFilter= async (req, res) => {
const { status } = req.body.formData;


    try {
        
        if (status) {
           
            const applications = await JobApplication.findAll({
                where: {
                    status: status,
                    user_id:req.user.id
                }
            });
            res.json({ applications });
        } else {
           
           const applications = await JobApplication.findAll();
           res.json({ applications });
        }

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error filtering applications' });
    }
}