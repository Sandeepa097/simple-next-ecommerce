const { User } = require('../models');

const create = async (user) => {
  return await User.create(user);
};

const findOne = async (where) => {
  return await User.findOne({
    where,
  });
};

const update = async (data, where) => {
  return await User.update(data, { where, individualHooks: true });
};

module.exports = {
  create,
  findOne,
  update,
};
