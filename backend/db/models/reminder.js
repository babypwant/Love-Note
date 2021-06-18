'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reminder = sequelize.define('Reminder', {
    userId: DataTypes.INTEGER,
    notesId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {});
  Reminder.associate = function(models) {
    // associations can be defined here
  };
  return Reminder;
};