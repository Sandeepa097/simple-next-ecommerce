'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      collectionId: {
        allowNull: true,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: 'Collections',
          key: 'urlKey',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      handle: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      descriptionHtml: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      availableForSale: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      featuredImageUrl: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      featuredImageAltText: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      featuredImageWidth: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      featuredImageHeight: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      tags: {
        allowNull: true,
        type: Sequelize.JSON,
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
    await queryInterface.dropTable('Products');
  },
};
