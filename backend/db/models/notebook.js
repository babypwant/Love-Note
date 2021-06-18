'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    userId: DataTypes.INTEGER,
    title: DataTypes.TEXT
  }, {});
  Notebook.associate = function (models) {
    Notebook.hasMany(models.Note, { onDelete: 'CASCADE', hooks: true, foreignKey: 'notebookId' })
    Notebook.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Notebook;
};