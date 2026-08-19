const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/db');

const Folder = sequelize.define('Folder', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

module.exports = Folder;