'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    name: DataTypes.STRING,
    notebookId: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {});
  Note.associate = function (models) {
    Note.belongsTo(models.Notebook, { foreignKey: 'notebookId' })
    Note.hasMany(models.Reminder, { foreignKey: 'notebookId' })
  };
  return Note;
};