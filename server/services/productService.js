const { Product } = require('../models');

export const findAll = async () => {
  return await Product.findAll();
};

export const create = async (data) => {
  return await Product.create(data);
};
