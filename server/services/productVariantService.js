const { ProductVariant } = require('../models');

export const create = async (data) => {
  return await ProductVariant.create(data);
};
