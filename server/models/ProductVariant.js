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

      models.ProductVariant.hasMany(models.ProductVariantAttributeValue, {
        foreignKey: 'productVariantId',
        as: 'selectedOptions',
      });
    }
  }

  ProductVariant.init(
    {
      productId: DataTypes.INTEGER.UNSIGNED,
      title: DataTypes.STRING,
      availableForSale: DataTypes.BOOLEAN,
      currencyCode: DataTypes.STRING(3),
      price: {
        type: DataTypes.DECIMAL(10, 2),
        get() {
          return {
            amount: this.getDataValue('price'),
            currencyCode: this.currencyCode,
          };
        },
      },
    },
    {
      sequelize,
      modelName: 'ProductVariant',
    }
  );

  return ProductVariant;
};
