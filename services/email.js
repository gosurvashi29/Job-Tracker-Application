require('dotenv').config();
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const User = require("../models/userModel")
const Reminder = require("../models/reminderModel");

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.USER,  
        pass: process.env.PASSWORD,
    },
});

cron.schedule('45 14 * * *', async () => {  // adjust as necessary will run at 4:45pm
    console.log('Checking for reminders...');

    const today = new Date().toISOString().split('T')[0];  // 'YYYY-MM-DD'
    //console.log('Today is:', today);

    
    const reminders = await Reminder.findAll({
        where: {
            reminder_date: today,
        }
    });

   // console.log('Reminders found:', reminders);

    
    if (reminders.length === 0) {
        console.log('No reminders found for today');
        return; // exit if no user found
    }

    
    for (const reminder of reminders) {
       // console.log('Processing reminder:', reminder);

        const user = await User.findOne({
            where: {
                id: reminder.user_id,
            }
        });

        //console.log('User found:', user);
        if (!user) {
            console.log('User not found for reminder ID:', reminder.user_id);
            continue; // to skip to next reminder if user not found
        }

        //console.log('User email:', user.email);

        
        const mailOptions = {
            from: process.env.USER,
            to: user.email,
            subject: 'Follow-Up Reminder',
            text: `You have a reminder to follow-up on your job application: ${reminder.reminder_message}`,
        };

        // Send email for each reminder
        try {
            await transporter.sendMail(mailOptions);
            console.log(`Reminder email sent to ${user.email}`);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
});
