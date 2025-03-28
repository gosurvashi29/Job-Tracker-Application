
const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const User = require("../models/userModel")

const Reminder = sequelize.define("Reminder", {
    reminder_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    reminder_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },

    reminder_message: {
        type: Sequelize.TEXT
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        references: {
            model: 'Users', 
            key: 'id'       
        }
    }
});

Reminder.associate = (models) => {
    
    Reminder.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
};

module.exports = Reminder;
