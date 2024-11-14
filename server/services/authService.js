const { User } = require('../models');

export const authenticate = async (username, password) => {
  const authUser = await User.scope('withPassword').findOne({
    where: { username },
  });

  const authenticationSucceeded = !authUser
    ? false
    : await authUser.isCorrectPassword(password);

  if (!authenticationSucceeded) return null;

  return await authUser.reload({ attributes: { exclude: ['password'] } });
};
