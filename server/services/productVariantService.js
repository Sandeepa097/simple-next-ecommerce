const { ProductVariant } = require('../models');

const create = async (data) => {
  return await ProductVariant.create(data);
};

const deleteByProductId = async (productId) => {
  return await ProductVariant.destroy({ where: { productId } });
};

module.exports = {
  create,
  deleteByProductId,
};
