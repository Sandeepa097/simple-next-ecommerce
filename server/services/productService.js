const { Op } = require('sequelize');
const {
  Product,
  ProductVariant,
  ProductVariantAttributeValue,
  Attribute,
  Category,
} = require('../models');

const findAll = async (where = null) => {
  if (!where) {
    return await Product.findAll();
  }
  return await Product.findAll({ where });
};

const searchByName = async (query) => {
  if (!query) {
    return await findAll();
  }

  return Product.findAll({
    where: {
      name: { [Op.like]: `%${query}%` },
    },
  });
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
        model: Category,
        as: 'category',
      },
    ],
  });
};

module.exports = {
  findAll,
  searchByName,
  create,
  findOne,
};
