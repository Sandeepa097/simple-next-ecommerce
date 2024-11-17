const sessionOptions = {
  password: process.env.SESSION_SECRET,
  cookieName: `${process.env.APP_NAME}-session`,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

module.exports = { sessionOptions };
