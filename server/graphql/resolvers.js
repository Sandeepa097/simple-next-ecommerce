const { findAll, findOne } = require('../services/productService');

const resolvers = {
  Query: {
    products: async (_, __) => {
      return findAll();
    },
    product: async (_, { urlKey }) => {
      return findOne({ urlKey });
    },
    menu: async (_, { handle }) => {
      return {
        items: [
          {
            title: 'Home',
            url: '/',
          },
          {
            title: 'About Us',
            url: '/about',
          },
          {
            title: 'Contact',
            url: '/contact',
          },
          {
            title: 'Shop',
            url: '/shop',
          },
        ],
      };
    },
  },
};
module.exports = resolvers;
