// models/applicationProgress.js

const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const ApplicationProgress = sequelize.define("ApplicationProgress", {
    progress_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    status: {
        type: Sequelize.STRING
    },

    date: {
        type: Sequelize.DATEONLY
    },

    notes: {
        type: Sequelize.TEXT
    }
});

module.exports = ApplicationProgress;
