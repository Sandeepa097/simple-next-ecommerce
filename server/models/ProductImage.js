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
      models.ProductImage.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
      });
    }
  }

  ProductVariant.init(
    {
      productId: DataTypes.INTEGER.UNSIGNED,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'ProductImage',
    }
  );

  return ProductVariant;
};
