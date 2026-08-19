const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Note = sequelize.define('Note', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '无标题'
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    updatedAt: {
        type: DataTypes.DATE
    },
}
);

module.exports = Note;