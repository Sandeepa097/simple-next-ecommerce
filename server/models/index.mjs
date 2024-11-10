import { Sequelize } from 'sequelize';
import {
  DB_DATABASE,
  DB_DIALECT,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from '../config/config.mjs';
import User from './User.js';
import Category from './Category.js';
import Product from './Product.js';
import Attribute from './Attribute.js';
import ProductVariant from './ProductVariant.js';
import ProductVariantAttributeValue from './ProductVariantAttributeValue.js';

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
};

models.sequelize = sequelizeConnection;
models.Sequelize = Sequelize;

export const sequelize = sequelizeConnection;
export default models;
