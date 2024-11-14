'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/config');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      contactWhatsapp: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      scopes: {
        withPassword: { attributes: {} },
      },
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const passwordHash = await bcrypt.hash(
              user.password,
              Number(SALT_ROUNDS)
            );
            user.password = passwordHash;
          }
        },
        beforeUpdate: async (user) => {
          if (user.password) {
            const passwordHash = await bcrypt.hash(
              user.password,
              Number(SALT_ROUNDS)
            );
            user.password = passwordHash;
          }
        },
      },
    }
  );

  User.prototype.isCorrectPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};
