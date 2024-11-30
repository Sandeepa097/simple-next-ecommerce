const { Product } = require('../models');

const findAll = async () => {
  return await Product.findAll();
};

const create = async (data) => {
  return await Product.create(data);
};

module.exports = {
  findAll,
  create,
};
