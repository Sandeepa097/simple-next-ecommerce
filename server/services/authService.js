const { User } = require('../models');

const authenticate = async (username, password) => {
  const authUser = await User.scope('withPassword').findOne({
    where: { username },
  });

  const authenticationSucceeded = !authUser
    ? false
    : await authUser.isCorrectPassword(password);

  if (!authenticationSucceeded) return null;

  return {
    id: authUser.dataValues.id,
    username: authUser.dataValues.username,
    createdAt: authUser.dataValues.createdAt,
    updatedAt: authUser.dataValues.updatedAt,
  };
};

module.exports = {
  authenticate,
};
