

const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const JobApplication = sequelize.define("JobApplication", {
    application_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    job_title: {
        type: Sequelize.STRING,
        allowNull: false
    },

    company_name: {
            type: Sequelize.STRING,
            allowNull: false
        },

    application_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },

    status: {
        type: Sequelize.ENUM('applied', 'interviewed', 'offered', 'rejected', 'accepted'),
        allowNull: false
    },

    notes: {
        type: Sequelize.TEXT
    },

    resume_path: {
        type: Sequelize.STRING
    },

    cover_letter_path: {
        type: Sequelize.STRING
    }
});

module.exports = JobApplication;
