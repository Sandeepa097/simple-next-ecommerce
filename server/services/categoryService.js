const { Category } = require('../models');

export const findAll = async () => {
  return await Category.findAll();
};

export const findOne = async (where) => {
  return await Category.findOne({ where });
};

export const create = async (data) => {
  return await Category.create(data);
};

export const update = async (data, where) => {
  return await Category.update(data, { where });
};

export const destroy = async (where) => {
  return await Category.destroy({ where });
};
