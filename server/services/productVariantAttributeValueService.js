const { ProductVariantAttributeValue } = require('../models');

const create = async (data) => {
  return await ProductVariantAttributeValue.create(data);
};

module.exports = {
  create,
};
