const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Company = sequelize.define("Company", {
    company_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    company_name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    contact_details: {
        type: Sequelize.TEXT
    },

    industry: {
        type: Sequelize.STRING
    },

    company_size: {
        type: Sequelize.STRING
    },

    notes: {
        type: Sequelize.TEXT
    }
});

module.exports = Company;
