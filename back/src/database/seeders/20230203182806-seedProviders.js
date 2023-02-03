'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('providers', [
      {
        id: 1,
        name: 'brazilian_provider',
      },
      {
        id: 2,
        name: 'european_provider',
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('providers', null, {});
  },
};
