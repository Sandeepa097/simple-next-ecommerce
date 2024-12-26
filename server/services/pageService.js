const { Page } = require('../models');

const findAll = async () => {
  return await Page.findAll({
    order: [['title', 'ASC']],
  });
};

const findOne = async (where) => {
  return await Page.findOne({ where });
};

const create = async (data) => {
  return await Page.create(data);
};

const update = async (data, where) => {
  return await Page.update(data, { where });
};

const destroy = async (where) => {
  return await Page.destroy({ where });
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  destroy,
};
