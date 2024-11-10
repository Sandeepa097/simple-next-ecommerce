import { QueryInterface, DataTypes } from 'sequelize';

export = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('ProductVariants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      productId: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: 'Products',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      price: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
      },
      isAvailable: {
        allowNull: false,
        defaultValue: true,
        type: DataTypes.BOOLEAN,
      },
      variantImage: {
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
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('ProductVariants');
  },
};
