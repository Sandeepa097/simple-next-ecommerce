const { findAll, findOne } = require('../services/productService');

const resolvers = {
  Query: {
    products: async (_, __) => {
      return findAll();
    },
    product: async (_, { urlKey }) => {
      return findOne({ urlKey });
    },
  },
};
module.exports = resolvers;
