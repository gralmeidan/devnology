'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('orders_products', [
      {
        order_id: 1,
        product_id: 1,
        provider_id: 1,
        quantity: 1,
      },
      {
        order_id: 1,
        product_id: 1,
        provider_id: 2,
        quantity: 2,
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('orders_products', null, {});
  },
};
