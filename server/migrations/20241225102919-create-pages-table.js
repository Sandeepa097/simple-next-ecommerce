'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      handle: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      title: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      body: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      bodySummary: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      seoDescription: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      seoTitle: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pages');
  },
};
