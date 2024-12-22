const dummyData = {
  collections: {
    'hidden-homepage-featured-items': {
      handle: 'collection-handle',
      title: 'Collection Title',
      description: 'Collection Description',
      seo: {
        description: 'SEO description for collection',
        title: 'SEO title for collection',
      },
      updatedAt: '2024-12-21T12:34:56Z',
      products: [
        {
          id: 'product-1-id',
          handle: 'product-1-handle',
          availableForSale: true,
          title: 'Product 1',
          description: 'Description for Product 1.',
          descriptionHtml: '<p>Description for Product 1.</p>',
          options: [
            { id: 'option-1-id', name: 'Color', values: ['Red', 'Blue'] },
            { id: 'option-2-id', name: 'Size', values: ['S', 'M'] },
          ],
          priceRange: {
            maxVariantPrice: { amount: '100.00', currencyCode: 'USD' },
            minVariantPrice: { amount: '50.00', currencyCode: 'USD' },
          },
          variants: [
            {
              id: 'variant-1-id',
              title: 'Red / S',
              availableForSale: true,
              selectedOptions: [
                { name: 'Color', value: 'Red' },
                { name: 'Size', value: 'S' },
              ],
              price: { amount: '60.00', currencyCode: 'USD' },
            },
          ],
          featuredImage: {
            url: 'https://example.com/image1.jpg',
            altText: 'Featured image of Product 1',
            width: 800,
            height: 600,
          },
          images: [
            {
              url: 'https://example.com/image2.jpg',
              altText: 'Additional image of Product 1',
              width: 800,
              height: 600,
            },
          ],
          seo: { description: 'SEO for product 1', title: 'Product 1 SEO' },
          tags: ['tag1', 'tag2'],
          updatedAt: '2024-12-21T12:34:56Z',
        },
        {
          id: 'product-2-id',
          handle: 'product-2-handle',
          availableForSale: true,
          title: 'Product 2',
          description: 'Description for Product 1.',
          descriptionHtml: '<p>Description for Product 1.</p>',
          options: [
            { id: 'option-1-id', name: 'Color', values: ['Red', 'Blue'] },
            { id: 'option-2-id', name: 'Size', values: ['S', 'M'] },
          ],
          priceRange: {
            maxVariantPrice: { amount: '100.00', currencyCode: 'USD' },
            minVariantPrice: { amount: '50.00', currencyCode: 'USD' },
          },
          variants: [
            {
              id: 'variant-1-id',
              title: 'Red / S',
              availableForSale: true,
              selectedOptions: [
                { name: 'Color', value: 'Red' },
                { name: 'Size', value: 'S' },
              ],
              price: { amount: '60.00', currencyCode: 'USD' },
            },
          ],
          featuredImage: {
            url: 'https://example.com/image1.jpg',
            altText: 'Featured image of Product 1',
            width: 800,
            height: 600,
          },
          images: [
            {
              url: 'https://example.com/image2.jpg',
              altText: 'Additional image of Product 1',
              width: 800,
              height: 600,
            },
          ],
          seo: { description: 'SEO for product 1', title: 'Product 1 SEO' },
          tags: ['tag1', 'tag2'],
          updatedAt: '2024-12-21T12:34:56Z',
        },
        {
          id: 'product-3-id',
          handle: 'product-3-handle',
          availableForSale: true,
          title: 'Product 3',
          description: 'Description for Product 1.',
          descriptionHtml: '<p>Description for Product 1.</p>',
          options: [
            { id: 'option-1-id', name: 'Color', values: ['Red', 'Blue'] },
            { id: 'option-2-id', name: 'Size', values: ['S', 'M'] },
          ],
          priceRange: {
            maxVariantPrice: { amount: '100.00', currencyCode: 'USD' },
            minVariantPrice: { amount: '50.00', currencyCode: 'USD' },
          },
          variants: [
            {
              id: 'variant-1-id',
              title: 'Red / S',
              availableForSale: true,
              selectedOptions: [
                { name: 'Color', value: 'Red' },
                { name: 'Size', value: 'S' },
              ],
              price: { amount: '60.00', currencyCode: 'USD' },
            },
          ],
          featuredImage: {
            url: 'https://example.com/image1.jpg',
            altText: 'Featured image of Product 1',
            width: 800,
            height: 600,
          },
          images: [
            {
              url: 'https://example.com/image2.jpg',
              altText: 'Additional image of Product 1',
              width: 800,
              height: 600,
            },
          ],
          seo: { description: 'SEO for product 1', title: 'Product 1 SEO' },
          tags: ['tag1', 'tag2'],
          updatedAt: '2024-12-21T12:34:56Z',
        },
      ],
    },
    'hidden-homepage-carousel': {
      handle: 'collection-handle',
      title: 'Collection Title',
      description: 'Collection Description',
      seo: {
        description: 'SEO description for collection',
        title: 'SEO title for collection',
      },
      updatedAt: '2024-12-21T12:34:56Z',
      products: [
        {
          id: 'product-1-id',
          handle: 'product-1-handle',
          availableForSale: true,
          title: 'Product 1',
          description: 'Description for Product 1.',
          descriptionHtml: '<p>Description for Product 1.</p>',
          options: [
            { id: 'option-1-id', name: 'Color', values: ['Red', 'Blue'] },
            { id: 'option-2-id', name: 'Size', values: ['S', 'M'] },
          ],
          priceRange: {
            maxVariantPrice: { amount: '100.00', currencyCode: 'USD' },
            minVariantPrice: { amount: '50.00', currencyCode: 'USD' },
          },
          variants: [
            {
              id: 'variant-1-id',
              title: 'Red / S',
              availableForSale: true,
              selectedOptions: [
                { name: 'Color', value: 'Red' },
                { name: 'Size', value: 'S' },
              ],
              price: { amount: '60.00', currencyCode: 'USD' },
            },
          ],
          featuredImage: {
            url: 'https://example.com/image1.jpg',
            altText: 'Featured image of Product 1',
            width: 800,
            height: 600,
          },
          images: [
            {
              url: 'https://example.com/image2.jpg',
              altText: 'Additional image of Product 1',
              width: 800,
              height: 600,
            },
          ],
          seo: { description: 'SEO for product 1', title: 'Product 1 SEO' },
          tags: ['tag1', 'tag2'],
          updatedAt: '2024-12-21T12:34:56Z',
        },
      ],
    },
  },
  menus: {
    'next-js-frontend-header-menu': {
      items: [
        { title: 'All', url: '/collections' },
        { title: 'Garments', url: '/collections/garments' },
        { title: 'Stickers', url: '/collections/stickers' },
      ],
    },
    'next-js-frontend-footer-menu': {
      items: [
        { title: 'About', url: '/about-us' },
        { title: 'Contact Us', url: '/contact-us' },
      ],
    },
  },
  collectionList: [
    {
      handle: 'collection-1',
      title: 'Collection 1',
      description: 'Description for Collection 1',
      seo: {
        description: 'SEO description for Collection 1',
        title: 'SEO title for Collection 1',
      },
      updatedAt: '2024-12-20T12:34:56Z',
    },
    {
      handle: 'collection-2',
      title: 'Collection 2',
      description: 'Description for Collection 2',
      seo: {
        description: 'SEO description for Collection 2',
        title: 'SEO title for Collection 2',
      },
      updatedAt: '2024-12-19T11:34:56Z',
    },
  ],
};

const resolvers = {
  Query: {
    collections: (_, { first, shortKey }) => {
      const edges = dummyData.collectionList.map((collection) => ({
        node: collection,
      }));

      return {
        edges, // Return the edges array
      };
    },
    collection: (_, { handle }) => {
      return dummyData.collections['hidden-homepage-carousel'] || null;
    },
    menu: (_, { handle }) => {
      return dummyData.menus[handle] || null;
    },
    product: (_, { handle }) => {
      return dummyData.collections['hidden-homepage-carousel'].products[0];
    },
    products: (_, { shortKey, reverse, query }) => {
      const edges = dummyData.collections[
        'hidden-homepage-carousel'
      ].products.map((product) => ({ node: product }));

      return { edges };
    },
    productRecommendations: (_, { productId }) => {
      return dummyData.collections['hidden-homepage-carousel'].products;
    },
    pageByHandle: (_, { handle }) => {
      const pages = [
        {
          id: '1',
          title: 'Home Page',
          handle: 'home',
          body: 'This is the body of the home page.',
          bodySummary: 'This is the summary of the home page.',
          seo: {
            description: 'SEO description for Home Page',
            title: 'SEO title for Home Page',
          },
          createdAt: '2024-12-21T12:00:00Z',
          updatedAt: '2024-12-21T12:00:00Z',
        },
        {
          id: '2',
          title: 'About Us',
          handle: 'about-us',
          body: 'This is the body of the about us page.',
          bodySummary: 'This is the summary of the about us page.',
          seo: {
            description: 'SEO description for About Us',
            title: 'SEO title for About Us',
          },
          createdAt: '2024-12-21T12:00:00Z',
          updatedAt: '2024-12-21T12:00:00Z',
        },
      ];

      // Find and return the page that matches the provided handle
      return pages.find((page) => page.handle === handle) || null;
    },
    pages: (_, { first }) => {
      // Mock data for pages, you can replace it with your actual database query
      const pages = [
        {
          id: '1',
          title: 'Home Page',
          handle: 'home',
          body: 'This is the body of the home page.',
          bodySummary: 'This is the summary of the home page.',
          seo: {
            description: 'SEO description for Home Page',
            title: 'SEO title for Home Page',
          },
          createdAt: '2024-12-21T12:00:00Z',
          updatedAt: '2024-12-21T12:00:00Z',
        },
        {
          id: '2',
          title: 'About Us',
          handle: 'about-us',
          body: 'This is the body of the about us page.',
          bodySummary: 'This is the summary of the about us page.',
          seo: {
            description: 'SEO description for About Us',
            title: 'SEO title for About Us',
          },
          createdAt: '2024-12-21T12:00:00Z',
          updatedAt: '2024-12-21T12:00:00Z',
        },
        // Add more mock pages as needed
      ];

      // Paginate the pages based on the "first" argument
      const edges = pages.slice(0, first).map((page) => ({ node: page }));

      // Return the paginated result
      return { edges };
    },
  },
  Collection: {
    products: (collection, { sortKey, reverse, first }) => {
      let products = collection.products || [];
      if (reverse) products = products.reverse();
      if (first) products = products.slice(0, first);

      return {
        edges: products.map((product) => ({ node: product })),
      };
    },
  },
  Product: {
    variants: (product, { first }) => {
      const variants = product.variants || [];
      return {
        edges: (first ? variants.slice(0, first) : variants).map((variant) => ({
          node: variant,
        })),
      };
    },
    images: (product, { first }) => {
      const images = product.images || [];
      return {
        edges: (first ? images.slice(0, first) : images).map((image) => ({
          node: image,
        })),
      };
    },
  },
};

module.exports = resolvers;
