const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const File = sequelize.define('File', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false
    },
    path:{
        type: DataTypes.STRING,
        allowNull: false
    },
    size:{
        type: DataTypes.INTEGER
    },
    mimeType:{
        type: DataTypes.STRING
    },
})

module.exports = File;