const express = require('express');
const { saveCompany, saveJobListing, getCompanies, saveReminder} = require('../controllers/companyController');
const { getStats, appFilter } = require('../controllers/visualController');
const router = express.Router();
const authenticate= require("../middleware/auth")


router.post("/save-company",authenticate,saveCompany)

router.post("/save-job-listing",authenticate,saveJobListing)

router.post("/save-reminder",authenticate,saveReminder)

router.get("/get-companies",authenticate,getCompanies)

router.get("/stats",authenticate,getStats)

router.post("/filter",authenticate,appFilter)


module.exports=router;