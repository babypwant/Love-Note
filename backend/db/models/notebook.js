'use strict';
module.exports = (sequelize, DataTypes) => {
  const notebook = sequelize.define('notebook', {
    userId: DataTypes.INTEGER,
    title: DataTypes.TEXT
  }, {});
  notebook.associate = function(models) {
    // associations can be defined here
  };
  return notebook;
};