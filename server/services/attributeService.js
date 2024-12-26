const { Attribute } = require('../models');

const findAll = async () => {
  return await Attribute.findAll({
    order: [['name', 'ASC']],
  });
};

const findOne = async (where) => {
  return await Attribute.findOne({ where });
};

const create = async (data) => {
  return await Attribute.create(data);
};

const update = async (data, where) => {
  return await Attribute.update(data, { where });
};

const destroy = async (where) => {
  return await Attribute.destroy({ where });
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  destroy,
};
