const { Category } = require('../models');

const findAll = async () => {
  return await Category.findAll();
};

const findOne = async (where) => {
  return await Category.findOne({ where });
};

const create = async (data) => {
  return await Category.create(data);
};

const update = async (data, where) => {
  return await Category.update(data, { where });
};

const destroy = async (where) => {
  return await Category.destroy({ where });
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  destroy,
};
