import { QueryInterface, DataTypes } from 'sequelize';

export = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      categoryId: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: 'Categories',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      coverPhoto: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      image: {
        allowNull: true,
        type: DataTypes.STRING,
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
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('Products');
  },
};
