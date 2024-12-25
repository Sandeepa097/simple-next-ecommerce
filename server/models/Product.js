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
      models.Product.belongsTo(models.Collection, {
        foreignKey: 'collectionId',
        as: 'collection',
      });

      models.Product.hasMany(models.ProductVariant, {
        foreignKey: 'productId',
        as: 'variants',
      });

      models.Product.hasMany(models.ProductImage, {
        foreignKey: 'productId',
        as: 'images',
      });
    }
  }
  Product.init(
    {
      collectionId: DataTypes.INTEGER.UNSIGNED,
      handle: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      descriptionHtml: DataTypes.TEXT,
      availableForSale: DataTypes.BOOLEAN,
      featuredImageUrl: DataTypes.STRING,
      featuredImageAltText: DataTypes.STRING,
      featuredImageWidth: DataTypes.INTEGER,
      featuredImageHeight: DataTypes.INTEGER,
      featuredImage: {
        type: DataTypes.VIRTUAL,
        get() {
          return {
            url: this.featuredImageUrl,
            altText: this.featuredImageAltText,
            width: this.featuredImageWidth,
            height: this.featuredImageHeight,
          };
        },
      },
      tags: DataTypes.JSON,
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
      options: {
        type: DataTypes.VIRTUAL,
        get() {
          if (!this.variants || this.variants.length === 0) return null;

          const options = this.variants.reduce((acc, variant) => {
            variant.selectedOptions.forEach((option) => {
              if (!acc[option.name]) {
                acc[option.name] = [];
              }

              if (!acc[option.name].includes(option.value)) {
                acc[option.name].push(option.value);
              }
            });

            return acc;
          }, {});

          return options;
        },
      },
      priceRange: {
        type: DataTypes.VIRTUAL,
        get() {
          if (!this.variants || this.variants.length === 0) return null;

          const prices = this.variants.map((variant) =>
            parseFloat(variant.price)
          );
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);

          return minPrice === maxPrice
            ? `${minPrice.toFixed(2)}`
            : `${minPrice.toFixed(2)} - ${maxPrice.toFixed(2)}`;
        },
      },
    },
    {
      sequelize,
      modelName: 'Product',
      hooks: {
        beforeValidate(product) {
          if (!product.handle && product.title) {
            product.handle = product.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-+|-+$/g, '');
          }
        },
      },
    }
  );
  return Product;
};
