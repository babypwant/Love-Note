'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Notebooks', [{
      name: 'Comp sci',
      userId: 4,
      description: 'Notes about a/A lifestyle',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notebooks', null, {});
  }
};
