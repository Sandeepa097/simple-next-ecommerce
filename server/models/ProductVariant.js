'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductVariant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.ProductVariant.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
      });
    }
  }

  ProductVariant.init(
    {
      productId: DataTypes.INTEGER.UNSIGNED,
      price: DataTypes.DECIMAL(10, 2),
      isAvailable: DataTypes.BOOLEAN,
      variantImage: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'ProductVariant',
    }
  );

  return ProductVariant;
};
