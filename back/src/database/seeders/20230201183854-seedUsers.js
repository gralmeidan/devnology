'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        firstName: 'Lorem',
        lastName: 'Ipsum',
        email: 'lorem_ipsum@hotmail.com',
        password:
          '$2b$10$IBhJSmwCfCrEKLWmbNI/uOk.4hERSY/l7boKP3EvtLwLnuw0UGzp6', // senha123,
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
