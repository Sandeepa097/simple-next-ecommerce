import dotenv from 'dotenv';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const APP_NAME = process.env.APP_NAME || 'my-app';
const PORT = Number(process.env.PORT || 3000);

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = Number(process.env.DB_PORT || 3306);
const DB_DIALECT = process.env.DB_DIALECT || 'mariadb';
const DB_DATABASE = process.env.DB_DATABASE || 'simple-next-ecommerce';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD;

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
const SESSION_SECRET =
  process.env.SESSION_SECRET || 'zzVFWmWDtidtnvyTZyNYNNpkeZPoExxD';

export {
  NODE_ENV,
  APP_NAME,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
  SALT_ROUNDS,
  SESSION_SECRET,
};
