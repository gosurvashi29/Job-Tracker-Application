const Sequelize=require("sequelize")

const sequelize=require("../util/database")

const Profile = sequelize.define("Profile",{

    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey:true
        

    },

    name:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },

    email:{
        type:Sequelize.STRING,
        allowNull: false,
        unique:true
    },
    phone:{
        type:Sequelize.STRING,
        allowNull: false,
        unique:true
    },

    career_goals:{   
        type: Sequelize.TEXT,
        allowNull:false
    }
})

module.exports=Profile;