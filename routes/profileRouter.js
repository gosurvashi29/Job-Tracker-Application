const express = require('express');
const { addProfile, getProfile} = require('../controllers/profileController');
const router = express.Router();
const authenticate= require("../middleware/auth")

router.post('/save-profile',authenticate, addProfile);


router.get('/get-profile',authenticate, getProfile);




module.exports = router;
