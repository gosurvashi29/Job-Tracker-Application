// models/file.js

const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const File = sequelize.define("File", {
    file_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    file_type: {
        type: Sequelize.STRING,
        allowNull: false
    },

    file_path: {
        type: Sequelize.STRING,
        allowNull: false
    },

    uploaded_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});

module.exports = File;
