'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {});
  Notebook.associate = function (models) {
    Notebook.hasMany(models.Note, { foreignKey: 'notebookId' })
    Notebook.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Notebook;
};