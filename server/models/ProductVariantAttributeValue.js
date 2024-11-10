'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class ProductVariantAttributeValue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.ProductVariantAttributeValue.belongsTo(models.ProductVariant, {
        foreignKey: 'productVariantId',
        as: 'productVariant',
      });
      models.ProductVariantAttributeValue.belongsTo(models.Attribute, {
        foreignKey: 'attributeId',
        as: 'attribute',
      });
    }
  }
  ProductVariantAttributeValue.init(
    {
      productVariantId: DataTypes.INTEGER.UNSIGNED,
      attributeId: DataTypes.INTEGER.UNSIGNED,
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'ProductVariantAttributeValue',
    }
  );
  return ProductVariantAttributeValue;
};
