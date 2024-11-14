import { SESSION_SECRET, NODE_ENV, APP_NAME } from './config.mjs';

export const sessionOptions = {
  password: SESSION_SECRET,
  cookieName: `${APP_NAME}-session`,
  cookieOptions: {
    secure: false,
  },
};
