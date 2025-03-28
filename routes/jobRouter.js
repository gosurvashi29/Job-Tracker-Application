const express = require('express');
const { saveJobApplication, getJobApplications, uploadFiles} = require('../controllers/jobController');
const router = express.Router();
const authenticate= require("../middleware/auth")
const upload = require("../middleware/upload");


router.post("/save-job-application",authenticate,saveJobApplication)

router.post("/uploadFile",authenticate,upload,uploadFiles)

router.get("/get-job-applications",authenticate,getJobApplications)

module.exports=router;