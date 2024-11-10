import { QueryInterface, DataTypes } from 'sequelize';

export = {
  async up(queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    await queryInterface.createTable('ProductVariantAttributeValues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      productVariantId: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: 'ProductVariants',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      attributeId: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: 'Attributes',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      value: {
        allowNull: false,
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
    await queryInterface.dropTable('ProductVariantAttributeValues');
  },
};
