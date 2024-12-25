const { Op } = require('sequelize');
const {
  Collection,
  Product,
  ProductVariant,
  ProductImage,
  Page,
} = require('../models');

const orderDecider = (shortKey, query = '') => {
  if (shortKey && shortKey.name) {
    if (shortKey.name === 'relevance') {
      return propertiesToOrderByRelevance(query);
    }
    return { order: [[shortKey.name, shortKey.reverse ? 'DESC' : 'ASC']] };
  }
  return {};
};

const propertiesToOrderByRelevance = (query) => {
  if (!query) return {};

  return {
    where: {
      [Op.and]: Sequelize.literal(
        `MATCH(title) AGAINST(:query IN NATURAL LANGUAGE MODE)`
      ),
    },
    attributes: {
      include: [
        [
          Sequelize.literal(
            `MATCH(title) AGAINST(:query IN NATURAL LANGUAGE MODE)`
          ),
          'relevanceScore',
        ],
      ],
    },
    order: [['relevanceScore', 'DESC']],
    replacements: { query },
  };
};

const getCollections = async (first, shortKey) => {
  return await Collection.findAll({
    limit: first,
    ...orderDecider(shortKey),
  });
};

const findCollection = async (handle) => {
  return await Collection.findOne({
    where: { handle },
  });
};

const getRandomCollection = async () => {
  return (
    await Collection.findAll({
      order: [[Sequelize.fn('RANDOM')]],
      limit: 1,
    })
  )[0];
};

const getCollectionProducts = async (collectionId, first, shortKey) => {
  return await Product.findAll({
    where: { collectionId },
    limit: first,
    ...orderDecider(shortKey),
  });
};

const findProduct = async (handle) => {
  return await Product.findOne({
    where: { handle },
  });
};

const getProducts = async (first, shortKey, query) => {
  return await Product.findAll({
    limit: first,
    ...orderDecider(shortKey),
    where: {
      name: {
        [Op.iLike]: `%${query}%`,
      },
    },
  });
};

const getProductVariants = async (productId, first) => {
  return await ProductVariant.findAll({
    where: { productId },
    limit: first,
  });
};

const getProductImages = async (productId, first) => {
  return await ProductImage.findAll({
    where: { productId },
    limit: first,
  });
};

const getRandomProducts = async (first) => {
  return await Product.findAll({
    order: [[Sequelize.fn('RANDOM')]],
    limit: first,
  });
};

const findPage = async (handle) => {
  return await Page.findOne({
    where: { handle },
  });
};

const getPages = async (first) => {
  return await Page.findAll({
    limit: first,
  });
};

module.exports = {
  getCollections,
  findCollection,
  getRandomCollection,
  getCollectionProducts,
  findProduct,
  getProducts,
  getProductVariants,
  getProductImages,
  getRandomProducts,
  findPage,
  getPages,
};
