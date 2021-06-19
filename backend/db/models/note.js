'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    userId: DataTypes.INTEGER,
    notebookId: DataTypes.INTEGER,
    title: DataTypes.TEXT,
    content: DataTypes.TEXT
  }, {});
  Note.associate = function (models) {
    Note.belongsTo(models.Notebook, { foreignKey: 'notebookId' })
    Note.hasOne(models.User, { foreignKey: 'userId' })
  };
  return Note;
};