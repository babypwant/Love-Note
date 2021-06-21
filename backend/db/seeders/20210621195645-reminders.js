'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reminders', [{
      userId: 4,
      notesId: 1,
      content: 'Remmember to write notes about a/A project!',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reminders', null, {});
  }
};
