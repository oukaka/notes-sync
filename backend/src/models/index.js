const sequelize = require('../config/db');
const User = require('./User');
const Folder = require('./Folder');
const Note = require('./Note');
const File = require('./File');

User.hasMany( Folder ,  {foreignKey:'userId',onDelete:'CASCADE'} );
Folder.belongsTo(User, {foreignKey:'userId'});

User.hasMany( Note ,  {foreignKey:'userId',onDelete:'CASCADE'} );
Note.belongsTo(User, {foreignKey:'userId'});

Folder.hasMany(Note, {foreignKey:'folderId', onDelete:'SET NULL'});
Note.belongsTo(Folder, {foreignKey:'folderId'});

User.hasMany(File, {foreignKey:'userId', onDelete:'CASCADE'});
File.belongsTo(User, {foreignKey:'userId'});

Note.hasMany(File, {foreignKey:'noteId', onDelete:'SET NULL'});
File.belongsTo(Note, {foreignKey:'noteId'});

module.exports = {
    sequelize,
    User,
    Folder,
    Note,
    File
};