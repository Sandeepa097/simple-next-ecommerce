const {
  getCollections,
  findCollection,
  getRandomCollection,
  getCollectionProducts,
  getProductVariants,
  getProductImages,
  findProduct,
  getProducts,
  getRandomProducts,
  getPages,
  findPage,
} = require('../services/graphqlService');

const getHeaderMenu = async () => {
  const firstTwoCollections = await getCollections(2);
  return [
    { title: 'All', url: '/collections' },
    ...firstTwoCollections.map((collection) => ({
      title: collection.name,
      url: `/collections/${collection.handle}`,
    })),
  ];
};

const resolvers = {
  Query: {
    collections: async (_, { first, shortKey }) => {
      const collections = await getCollections(first, { name: shortKey });

      return {
        edges: collections.map((collection) => {
          return {
            node: {
              ...collection.dataValues,
            },
          };
        }),
      };
    },
    collection: async (_, { handle }) => {
      const getRandom =
        handle === 'hidden-homepage-carousel' ||
        handle === 'hidden-homepage-featured-items';

      return getRandom
        ? await getRandomCollection()
        : await findCollection(handle);
    },
    menu: async (_, { handle }) => {
      const isHeaderMenu = handle === 'next-js-frontend-header-menu';

      return isHeaderMenu
        ? await getHeaderMenu()
        : (await getPages(5)).map((page) => ({
            title: page.title,
            url: `/${page.handle}`,
          }));
    },
    product: async (_, { handle }) => {
      return await findProduct(handle);
    },
    products: async (_, { shortKey, reverse, query, first }) => {
      const edges = await getProducts(
        first,
        { name: shortKey, reverse },
        query
      );

      return { edges };
    },
    productRecommendations: async (_, { productId }) => {
      return await getRandomProducts(15);
    },
    pageByHandle: async (_, { handle }) => {
      return await findPage(handle);
    },
    pages: async (_, { first }) => {
      const pages = await getPages(first);
      const edges = pages.map((page) => ({ node: page.dataValues }));

      return { edges };
    },
  },
  Collection: {
    products: async (collection, { sortKey, reverse, first }) => {
      const products = await getCollectionProducts(collection.id, first, {
        name: sortKey,
        reverse,
      });

      return {
        edges: products.map((product) => ({ node: product.dataValues })),
      };
    },
  },
  Product: {
    variants: async (product, { first }) => {
      const variants = await getProductVariants(product.id, first);
      return {
        edges: variants.map((variant) => ({
          node: variant.dataValues,
        })),
      };
    },
    images: async (product, { first }) => {
      const images = await getProductImages(product.id, first);
      return {
        edges: images.map((image) => ({
          node: image.dataValues,
        })),
      };
    },
  },
};

module.exports = resolvers;
