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
  const firstTwoCollections = await getCollections(3);
  return [
    { title: 'All', url: '/collections' },
    ...firstTwoCollections.map((collection) => ({
      title: collection.title,
      url: `/collections/${collection.handle}`,
    })),
  ];
};

const includeProductVirtualFields = (product) => ({
  ...product.dataValues,
  seo: product.seo,
  featuredImage: product.featuredImage,
  variants: product.variants,
  options: product.options,
  priceRange: product.priceRange,
  tags: product.tags,
});

const includeProductVariantVirtualFields = (variant) => ({
  ...variant.dataValues,
  selectedOptions: variant.selectedOptions,
  price: variant.price,
});

const resolvers = {
  Query: {
    collections: async (_, { first, sortKey }) => {
      const collections = await getCollections(first, { name: sortKey });

      return {
        edges: collections.map((collection) => {
          return {
            node: {
              ...collection.dataValues,
              seo: collection.seo,
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

      const menuItems = isHeaderMenu
        ? await getHeaderMenu()
        : (await getPages(5)).map((page) => ({
            title: page.title,
            url: `/${page.handle}`,
          }));

      return { items: menuItems };
    },
    product: async (_, { handle }) => {
      const product = await findProduct(handle);
      if (!product) {
        return null;
      }
      return {
        ...includeProductVirtualFields(product),
      };
    },
    products: async (_, { sortKey, reverse, query, first }) => {
      const products = await getProducts(
        first,
        { name: sortKey, reverse },
        query
      );

      return {
        edges: products.map((product) => {
          return {
            node: {
              ...includeProductVirtualFields(product),
            },
          };
        }),
      };
    },
    productRecommendations: async (_, { productId }) => {
      return await getRandomProducts(15);
    },
    pageByHandle: async (_, { handle }) => {
      return await findPage(handle);
    },
    pages: async (_, { first }) => {
      const pages = await getPages(first);
      const edges = pages.map((page) => ({
        node: { ...page.dataValues, seo: page.seo },
      }));

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
        edges: products.map((product) => ({
          node: {
            ...includeProductVirtualFields(product),
          },
        })),
      };
    },
  },
  Product: {
    variants: async (product, { first }) => {
      return {
        edges: product.variants.slice(0, first).map((variant) => ({
          node: {
            ...includeProductVariantVirtualFields(variant),
          },
        })),
      };
    },
    images: async (product, { first }) => {
      const images = await getProductImages(product.id, first);
      return {
        edges: images.map((image) => ({
          node: {
            ...image.dataValues,
            url: image.urlPath,
          },
        })),
      };
    },
  },
  CollectionSortKeys: {
    TITLE: 'title',
    CREATED_AT: 'createdAt',
  },
  ProductCollectionSortKeys: {
    TITLE: 'title',
    CREATED_AT: 'createdAt',
    PRICE: 'price',
    RELEVANCE: 'relevance',
  },
  ProductSortKeys: {
    TITLE: 'title',
    CREATED_AT: 'createdAt',
    PRICE: 'price',
    RELEVANCE: 'relevance',
  },
};

module.exports = resolvers;
