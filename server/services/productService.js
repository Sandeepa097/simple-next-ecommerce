const { Op } = require('sequelize');
const {
  Product,
  ProductVariant,
  ProductVariantAttributeValue,
  Attribute,
  Collection,
  ProductImage,
} = require('../models');

const findAll = async (options = null) => {
  if (!options) {
    return await Product.findAll();
  }
  return await Product.findAll({ ...options });
};

const create = async (data) => {
  return await Product.create(data);
};

const findOne = async (where) => {
  return await Product.findOne({
    where,
    include: [
      {
        model: ProductVariant,
        as: 'productVariants',
        include: [
          {
            model: ProductVariantAttributeValue,
            as: 'productVariantAttributeValues',
            include: [
              {
                model: Attribute,
                as: 'attribute',
              },
            ],
          },
        ],
      },
      {
        model: Collection,
        as: 'collection',
      },
      {
        model: ProductImage,
        as: 'images',
      },
    ],
  });
};

module.exports = {
  findAll,
  create,
  findOne,
};
