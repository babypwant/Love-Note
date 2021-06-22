'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    description: DataTypes.TEXT,

  }, {});

  Notebook.notebookCreate = async function ({ name, userId, description }) {
    const notebook = await Notebook.create({
      name,
      userId,
      description,
    });
    return await Notebook.findByPk(notebook.id);
  };
  Notebook.associate = function (models) {
    Notebook.hasMany(models.Note, { foreignKey: 'notebookId' })
    Notebook.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Notebook;
};