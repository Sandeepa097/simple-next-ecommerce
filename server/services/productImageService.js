const { ProductImage } = require('../models');

const create = async (data) => {
  return await ProductImage.create(data);
};

const deleteByProductId = async (productId) => {
  return await ProductImage.destroy({ where: { productId } });
};

module.exports = {
  create,
  deleteByProductId,
};
