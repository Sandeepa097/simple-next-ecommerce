'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category',
      });
    }
  }
  Product.init(
    {
      categoryId: DataTypes.INTEGER.UNSIGNED,
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      coverPhoto: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
