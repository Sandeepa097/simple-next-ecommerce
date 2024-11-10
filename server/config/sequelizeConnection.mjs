import { Sequelize } from 'sequelize';
import {
  DB_DATABASE,
  DB_DIALECT,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from './config.mjs';
import {
  User,
  Category,
  Attribute,
  Product,
  ProductVariant,
  ProductVariantAttributeValue,
} from '../models';

const sequelizeConnection = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  database: DB_DATABASE,
  username: DB_USER,
  password: DB_PASSWORD,
});

sequelizeConnection.addModels([
  User,
  Category,
  Attribute,
  Product,
  ProductVariant,
  ProductVariantAttributeValue,
]);

export default sequelizeConnection;
