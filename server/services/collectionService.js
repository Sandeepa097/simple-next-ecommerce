const { Collection } = require('../models');

const findAll = async () => {
  return await Collection.findAll({
    order: [['title', 'ASC']],
  });
};

const findOne = async (where) => {
  return await Collection.findOne({ where });
};

const create = async (data) => {
  return await Collection.create(data);
};

const update = async (data, where) => {
  return await Collection.update(data, { where });
};

const destroy = async (where) => {
  return await Collection.destroy({ where });
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  destroy,
};
