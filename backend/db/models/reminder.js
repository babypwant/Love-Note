'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reminder = sequelize.define('Reminder', {
    userId: DataTypes.INTEGER,
    notesId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {});
  Reminder.associate = function (models) {
    Reminder.belongsTo(models.User, { foreignKey: 'userId' })
    Reminder.hasMany(models.Note, { foreignKey: 'notesId' })
  };
  return Reminder;
};