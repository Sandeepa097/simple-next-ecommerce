const { ProductImage } = require('../models');

const create = async (data) => {
  return await ProductImage.create(data);
};

module.exports = {
  create,
};
