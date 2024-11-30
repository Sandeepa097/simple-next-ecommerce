const { ProductVariant } = require('../models');

const create = async (data) => {
  return await ProductVariant.create(data);
};

module.exports = {
  create,
};
