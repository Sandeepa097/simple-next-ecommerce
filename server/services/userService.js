const { User } = require('../models');

export const create = async (user) => {
  return await User.create(user);
};

export const findOne = async (where) => {
  return await User.findOne({
    where,
  });
};
