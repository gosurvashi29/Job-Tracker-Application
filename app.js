const Profile = require("./models/profileModel")
const JobListing = require("./models/jobListingModel")
const express= require("express");
const path = require("path")
const bodyParser= require("body-parser")
const sequelize= require("./util/database")
const userRoutes= require("./routes/userRouter")
const profileRoutes = require('./routes/profileRouter');
const jobRoutes = require('./routes/jobRouter');
const companyRoutes = require('./routes/companyRouter');
const User = require("./models/userModel")
const Company = require('./models/companyModel');
const JobApplication = require('./models/jobApplicationModel');
const Reminder = require('./models/reminderModel');
const ApplicationProgress = require('./models/applicationProgModel');
const multer= require("multer")
const File = require('./models/fileModel');
const emailService = require('./services/email'); 
 
const app=express();

var cors= require("cors"); 
 
 
app.use(cors({
    origin: "*",  // Allow all origins 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow all methods 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  }));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,"Public")));

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
      return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      
      return cb(null, `${Date.now()}-${file.originalname}`);
    }
  })
  
  const upload = multer({ storage: storage })

User.hasMany(JobApplication, { foreignKey: 'user_id' });
JobApplication.belongsTo(User, { foreignKey: 'user_id' });

Company.hasMany(JobApplication, { foreignKey: 'company_id' });
JobApplication.belongsTo(Company, { foreignKey: 'company_id' });

User.hasMany(Reminder, { foreignKey: 'user_id' });
Reminder.belongsTo(User, { foreignKey: 'user_id' });



Profile.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(Profile, { foreignKey: 'user_id' });

JobListing.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(JobListing, { foreignKey: 'user_id' });

File.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(File, { foreignKey: 'user_id' });


app.use("/user",userRoutes); 
app.use("/profile",profileRoutes); 
app.use("/job",jobRoutes);
app.use("/company",companyRoutes)

app.post('/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ message: 'No file uploaded' });
        }

        const filePath = req.file.path; 
        console.log('File uploaded:', req.file);

        

        res.status(200).send({ message: 'File uploaded successfully', filePath : filePath });
    } catch (err) {
        console.error('Error uploading file:', err);
        res.status(500).send({ message: 'Error uploading file' });
    }
}); 
 




 app.get('*', (req, res) => {
    const requestedUrl = req.url;
    console.log('Requested URL:', requestedUrl);
    console.log('Current directory:', __dirname);

    if (requestedUrl.startsWith('/views/')) {
        
        const filePath = path.join(__dirname, 'views', requestedUrl.slice(7)+'.html');
        console.log('Serving file from path:', filePath);

        
        res.sendFile(filePath, (err) => { 
            if (err) {
                console.error('Error serving file:', err); 
                res.status(404).send('File Not Found');
            }
        });
    }  
     
    else{
        
        if(requestedUrl.startsWith('/css/')) {
        
        const publicPath = path.join(__dirname, 'Public', requestedUrl+'.css'); 
        console.log('Serving file from path:', publicPath);
        res.sendFile(publicPath, (err) => { 
            
            if (err) {
                console.error('Error serving file:', err); 
                res.status(404).send('File Not Found');
            }
        });  
    }
    else {
        
        const publicPath = path.join(__dirname, 'Public','js', requestedUrl+'.js');
        console.log('Serving file from path:', publicPath);
        res.sendFile(publicPath, (err) => {
            
            if (err) {
                console.error('Error serving file:', err); 
                res.status(404).send('File Not Found'); 
            }
        });  
    }
}
});


sequelize
.sync({force:false})
.then(result=>{
    console.log('Database synced!'); 
    app.listen(process.env.PORT || 4000,()=>{console.log(`Server is running on http://localhost:${process.env.PORT || 4000}`)});
})
.catch(err=>{
    console.log(err) 
}); 