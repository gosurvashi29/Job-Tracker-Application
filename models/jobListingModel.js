
const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const JobListing = sequelize.define("JobListing", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    jobtitle: {
        type: Sequelize.TEXT,
        allowNull: false
    },

    company: {
        type: Sequelize.TEXT
    },
    notes: {
        type: Sequelize.TEXT
    }
    
});

module.exports = JobListing;
