'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Product.belongsTo(models.Category, {
        foreignKey: 'categoryKey',
        targetKey: 'urlKey',
        as: 'category',
      });

      models.Product.hasMany(models.ProductVariant, {
        foreignKey: 'productId',
        as: 'productVariants',
      });

      models.Product.hasMany(models.ProductImage, {
        foreignKey: 'productId',
        as: 'images',
      });
    }
  }
  Product.init(
    {
      categoryKey: DataTypes.STRING,
      name: DataTypes.STRING,
      urlKey: DataTypes.STRING,
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
