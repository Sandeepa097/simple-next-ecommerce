const { Op, Sequelize } = require('sequelize');
const {
  Collection,
  Product,
  ProductVariant,
  ProductImage,
  Page,
  ProductVariantAttributeValue,
  Attribute,
} = require('../models');

const orderDecider = (sortKey, query = '') => {
  if (sortKey && sortKey.name) {
    if (sortKey.name === 'relevance') {
      return propertiesToOrderByRelevance(query);
    } else if (sortKey.name === 'price') {
      return propertiesToOrderByPrice(sortKey);
    }
    return { order: [[sortKey.name, sortKey.reverse ? 'DESC' : 'ASC']] };
  }
  return {};
};

const propertiesToOrderByRelevance = (query) => {
  if (!query) return {};

  return {
    subQuery: false,
    where: {
      [Op.and]: Sequelize.literal(
        `MATCH(Product.title, Product.description) AGAINST(:query IN NATURAL LANGUAGE MODE)`
      ),
    },
    attributes: {
      include: [
        [
          Sequelize.literal(
            `MATCH(Product.title, Product.description) AGAINST(:query IN NATURAL LANGUAGE MODE)`
          ),
          'relevanceScore',
        ],
      ],
    },
    order: [['relevanceScore', 'DESC']],
    replacements: { query },
  };
};

const propertiesToOrderByPrice = (sortKey) => {
  return {
    subQuery: false,
    attributes: {
      include: [
        [Sequelize.fn('MIN', Sequelize.col('variants.price')), 'minPrice'],
      ],
    },
    group: ['Product.id'],
    order: [[Sequelize.literal('minPrice'), sortKey.reverse ? 'DESC' : 'ASC']],
  };
};

const getCollections = async (first, sortKey) => {
  return await Collection.findAll({
    ...orderDecider(sortKey),
    limit: first,
  });
};

const findCollection = async (handle) => {
  return await Collection.findOne({
    where: { handle },
  });
};

const getRandomCollection = async () => {
  return await Collection.findOne({
    order: Sequelize.literal('rand()'),
  });
};

const getCollectionProducts = async (collectionId, first, sortKey) => {
  return await Product.findAll({
    where: { collectionId },
    include: {
      model: ProductVariant,
      as: 'variants',
      include: {
        model: ProductVariantAttributeValue,
        as: 'selectedOptions',
        include: {
          model: Attribute,
          as: 'attribute',
        },
      },
    },
    ...orderDecider(sortKey),
    limit: first,
  });
};

const findProduct = async (handle) => {
  return await Product.findOne({
    where: { handle },
    include: {
      model: ProductVariant,
      as: 'variants',
      include: {
        model: ProductVariantAttributeValue,
        as: 'selectedOptions',
        include: {
          model: Attribute,
          as: 'attribute',
        },
      },
    },
  });
};

const getProducts = async (first, sortKey, query) => {
  return await Product.findAll({
    ...(query
      ? {
          where: {
            title: {
              [Op.like]: `%${query}%`,
            },
          },
        }
      : {}),
    include: {
      model: ProductVariant,
      as: 'variants',
      include: {
        model: ProductVariantAttributeValue,
        as: 'selectedOptions',
        include: {
          model: Attribute,
          as: 'attribute',
        },
      },
    },
    ...orderDecider(sortKey, query),
    limit: first,
  });
};

const getProductVariants = async (productId, first) => {
  return await ProductVariant.findAll({
    where: { productId },
    include: {
      model: ProductVariantAttributeValue,
      as: 'selectedOptions',
      include: {
        model: Attribute,
        as: 'attribute',
      },
    },
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
    include: {
      model: ProductVariant,
      as: 'variants',
      include: {
        model: ProductVariantAttributeValue,
        as: 'selectedOptions',
        include: {
          model: Attribute,
          as: 'attribute',
        },
      },
    },
    order: Sequelize.literal('rand()'),
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
