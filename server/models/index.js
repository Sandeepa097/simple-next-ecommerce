const { Sequelize } = require('sequelize');
const {
  DB_DATABASE,
  DB_DIALECT,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} = require('../config/config');
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Attribute = require('./Attribute');
const ProductVariant = require('./ProductVariant');
const ProductVariantAttributeValue = require('./ProductVariantAttributeValue');
const ProductImage = require('./ProductImage');

const sequelizeConnection = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  database: DB_DATABASE,
  username: DB_USER,
  password: DB_PASSWORD,
});

const models = {
  User: User(sequelizeConnection, Sequelize.DataTypes),
  Category: Category(sequelizeConnection, Sequelize.DataTypes),
  Product: Product(sequelizeConnection, Sequelize.DataTypes),
  Attribute: Attribute(sequelizeConnection, Sequelize.DataTypes),
  ProductVariant: ProductVariant(sequelizeConnection, Sequelize.DataTypes),
  ProductVariantAttributeValue: ProductVariantAttributeValue(
    sequelizeConnection,
    Sequelize.DataTypes
  ),
  ProductImage: ProductImage(sequelizeConnection, Sequelize.DataTypes),
};

Object.keys(models).forEach((model) => {
  if (models[model]?.associate) {
    models[model].associate(models);
  }
});

models.sequelize = sequelizeConnection;
models.Sequelize = Sequelize;

module.exports = models;
