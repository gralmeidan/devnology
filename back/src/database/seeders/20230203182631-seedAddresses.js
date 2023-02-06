'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('addresses', [
      {
        id: 1,
        user_id: 1,
        street: 'Av. Paulista',
        number: '12 - 34',
        city: 'São Paulo',
        cep: '01153-000',
        state: 'SP',
        deleted_at: null,
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('addresses', null, {});
  },
};
