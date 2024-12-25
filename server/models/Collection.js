'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Collection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Collection.hasMany(models.Product, {
        foreignKey: 'collectionId',
        as: 'products',
      });
    }
  }
  Collection.init(
    {
      handle: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      seoDescription: DataTypes.TEXT,
      seoTitle: DataTypes.STRING,
      seo: {
        type: DataTypes.VIRTUAL,
        get() {
          return {
            title: this.seoTitle,
            description: this.seoDescription,
          };
        },
      },
    },
    {
      sequelize,
      modelName: 'Collection',
      hooks: {
        beforeValidate(collection) {
          if (!collection.handle && collection.title) {
            collection.handle = collection.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, '');
          }
        },
      },
    }
  );
  return Collection;
};
