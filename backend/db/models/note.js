'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    name: DataTypes.STRING,
    notebookId: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {});

  Note.noteCreate = async function ({ name, notebookId, description }) {
    const note = await Note.create({
      name,
      notebookId,
      description,
    });
    return await Note.findByPk(note.id);
  };
  Note.associate = function (models) {
    Note.belongsTo(models.Notebook, { foreignKey: 'notebookId' })
    Note.hasMany(models.Reminder, { foreignKey: 'notebookId' })
  };
  return Note;
};