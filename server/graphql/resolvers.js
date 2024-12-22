const resolvers = {
  Query: {
    collection: (_, { handle, sortKey, reverse }) => {
      console.log('collection handle: ', handle);
      console.log('sortKey: ', sortKey);
      console.log('reverse: ', reverse);
      const products = [
        {
          id: 'product-1-id',
          handle: 'product-1-handle',
          availableForSale: true,
          title: 'Product 1',
          description: 'Description for Product 1.',
          descriptionHtml: '<p>Description for Product 1.</p>',
          options: [
            {
              id: 'option-1-id',
              name: 'Color',
              values: ['Red', 'Blue', 'Green'],
            },
            { id: 'option-2-id', name: 'Size', values: ['S', 'M', 'L'] },
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
              altText: 'Additional image 1',
              width: 800,
              height: 600,
            },
            {
              url: 'https://example.com/image3.jpg',
              altText: 'Additional image 2',
              width: 800,
              height: 600,
            },
          ],
          seo: {
            description: 'SEO description for Product 1',
            title: 'SEO title for Product 1',
          },
          tags: ['tag1', 'tag2'],
          updatedAt: '2024-12-21T12:34:56Z',
        },
        {
          id: 'product-2-id',
          handle: 'product-2-handle',
          availableForSale: false,
          title: 'Product 2',
          description: 'Description for Product 2.',
          descriptionHtml: '<p>Description for Product 2.</p>',
          options: [],
          priceRange: {
            maxVariantPrice: { amount: '200.00', currencyCode: 'USD' },
            minVariantPrice: { amount: '150.00', currencyCode: 'USD' },
          },
          variants: [],
          featuredImage: null,
          images: [],
          seo: {
            description: 'SEO description for Product 2',
            title: 'SEO title for Product 2',
          },
          tags: ['tagA', 'tagB'],
          updatedAt: '2024-12-20T11:22:33Z',
        },
      ];

      // Sort and reverse logic
      const sortedProducts = [...products].sort((a, b) => {
        if (sortKey === 'TITLE') return a.title.localeCompare(b.title);
        if (sortKey === 'UPDATED_AT')
          return new Date(a.updatedAt) - new Date(b.updatedAt);
        if (sortKey === 'PRICE')
          return (
            parseFloat(a.priceRange.minVariantPrice.amount) -
            parseFloat(b.priceRange.minVariantPrice.amount)
          );
        return 0;
      });

      if (reverse) sortedProducts.reverse();

      return {
        products: {
          edges: sortedProducts.map((product) => ({
            node: {
              ...product,
              variants: {
                edges: product.variants.map((variant) => ({ node: variant })),
              },
              images: {
                edges: product.images.map((image) => ({ node: image })),
              },
            },
          })),
        },
      };
    },
    menu: (_, { handle }) => {
      console.log('menu handle: ', handle);
      const menus = {
        main: {
          items: [
            { title: 'Home', url: '/' },
            { title: 'Shop', url: '/shop' },
            { title: 'Contact', url: '/contact' },
          ],
        },
        footer: {
          items: [
            { title: 'Privacy Policy', url: '/privacy-policy' },
            { title: 'Terms of Service', url: '/terms' },
          ],
        },
      };

      return menus[handle] || { items: [] };
    },
  },
};

module.exports = resolvers;
