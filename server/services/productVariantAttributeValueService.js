const { ProductVariantAttributeValue } = require('../models');

export const create = async (data) => {
  return await ProductVariantAttributeValue.create(data);
};
