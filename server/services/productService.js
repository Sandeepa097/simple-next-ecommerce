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
    return await Product.findAll({
      order: [['createdAt', 'DESC']],
    });
  }
  return await Product.findAll({ order: [['createdAt', 'DESC']], ...options });
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
        as: 'variants',
        include: {
          model: ProductVariantAttributeValue,
          as: 'selectedOptions',
          include: {
            model: Attribute,
            as: 'attribute',
          },
        },
      },
      {
        model: ProductImage,
        as: 'images',
      },
    ],
  });
};

const update = async (data, where) => {
  return await Product.update(data, { where });
};

const destroy = async (where) => {
  return await Product.destroy({ where });
};

const count = async () => {
  return await Product.count();
};

module.exports = {
  findAll,
  create,
  findOne,
  update,
  destroy,
  count,
};
