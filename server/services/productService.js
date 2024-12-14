const {
  Product,
  ProductVariant,
  ProductVariantAttributeValue,
} = require('../models');

const findAll = async (where = null) => {
  if (!where) {
    return await Product.findAll();
  }
  return await Product.findAll({ where });
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
          },
        ],
      },
    ],
  });
};

module.exports = {
  findAll,
  create,
  findOne,
};
