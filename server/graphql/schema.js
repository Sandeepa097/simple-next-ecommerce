const { gql } = require('apollo-server-micro');

const typeDefs = gql`
  type Product {
    id: ID!
    categoryKey: String
    name: String
    urlKey: String
    description: String
    image: String
    category: Category
    productVariants: [ProductVariant]
    images: [ProductImage]
  }

  type Category {
    id: ID!
    urlKey: String
    name: String
  }

  type ProductVariant {
    id: ID!
    name: String
    price: Float
    productId: Int
  }

  type ProductImage {
    id: ID!
    url: String
    productId: Int
  }

  type Query {
    products: [Product]
    product(urlKey: String!): Product
  }
`;

module.exports = typeDefs;
