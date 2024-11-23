const { Attribute } = require('../models');

export const findAll = async () => {
  return await Attribute.findAll();
};

export const findOne = async (where) => {
  return await Attribute.findOne({ where });
};

export const create = async (data) => {
  return await Attribute.create(data);
};

export const update = async (data, where) => {
  return await Attribute.update(data, { where });
};

export const destroy = async (where) => {
  return await Attribute.destroy({ where });
};
