import {
  NODE_ENV,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
  DB_DIALECT,
} from './config.mjs';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  [NODE_ENV]: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: DB_DIALECT,
  },
};
