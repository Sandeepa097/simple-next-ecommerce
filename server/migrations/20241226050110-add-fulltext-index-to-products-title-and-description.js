'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex('Products', ['title', 'description'], {
      type: 'FULLTEXT',
      name: 'Products_title_description_fulltext',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex(
      'Products',
      'Products_title_description_fulltext'
    );
  },
};
