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
            url: `/api/files/products/${this.featuredImageUrl}`,
            altText: this.featuredImageAltText,
            width: this.featuredImageWidth,
            height: this.featuredImageHeight,
          };
        },
      },
      tags: {
        type: DataTypes.JSON,
        get() {
          return [];
        },
      },
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
          if (!this.variants || this.variants.length === 0) return [];

          const optionsMap = this.variants.reduce((acc, variant) => {
            variant.selectedOptions.forEach((option) => {
              if (!acc[option.name]) {
                acc[option.name] = {
                  id: option.id,
                  name: option.name,
                  values: [],
                };
              }

              if (!acc[option.name].values.includes(option.value)) {
                acc[option.name].values.push(option.value);
              }
            });

            return acc;
          }, {});

          return Object.values(optionsMap);
        },
      },
      priceRange: {
        type: DataTypes.VIRTUAL,
        get() {
          if (!this.variants || this.variants.length === 0)
            return {
              minVariantPrice: {
                amount: '0.00',
                currencyCode: 'USD',
              },
              maxVariantPrice: {
                amount: '0.00',
                currencyCode: 'USD',
              },
            };

          const prices = this.variants.map((variant) =>
            parseFloat(variant.price.amount)
          );

          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);

          return {
            minVariantPrice: {
              amount: minPrice.toFixed(2),
              currencyCode: this.variants[0].price.currencyCode,
            },
            maxVariantPrice: {
              amount: maxPrice.toFixed(2),
              currencyCode: this.variants[0].price.currencyCode,
            },
          };
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
