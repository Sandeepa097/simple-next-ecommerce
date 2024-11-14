const { SESSION_SECRET, NODE_ENV, APP_NAME } = require('./config');

const sessionOptions = {
  password: SESSION_SECRET,
  cookieName: `${APP_NAME}-session`,
  cookieOptions: {
    secure: NODE_ENV === 'production',
  },
};

module.exports = { sessionOptions };
