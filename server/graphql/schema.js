const { gql } = require('apollo-server-micro');

const typeDefs = gql`
  enum ProductCollectionSortKeys {
    TITLE
    UPDATED_AT
    PRICE
  }

  type Query {
    collection(
      handle: String!
      sortKey: ProductCollectionSortKeys
      reverse: Boolean
    ): Collection
    menu(handle: String!): Menu
  }

  type Collection {
    products(
      sortKey: ProductCollectionSortKeys
      reverse: Boolean
      first: Int
    ): ProductConnection
  }

  type Menu {
    items: [MenuItem!]!
  }

  type MenuItem {
    title: String!
    url: String!
  }

  type ProductConnection {
    edges: [ProductEdge]
  }

  type ProductEdge {
    node: Product
  }

  type Product {
    id: ID!
    handle: String!
    availableForSale: Boolean!
    title: String!
    description: String!
    descriptionHtml: String!
    options: [ProductOption!]
    priceRange: PriceRange!
    variants(first: Int): VariantConnection!
    featuredImage: Image
    images(first: Int): ImageConnection!
    seo: SEO!
    tags: [String!]!
    updatedAt: String!
  }

  type ProductOption {
    id: ID!
    name: String!
    values: [String!]!
  }

  type PriceRange {
    maxVariantPrice: Price!
    minVariantPrice: Price!
  }

  type Price {
    amount: String!
    currencyCode: String!
  }

  type VariantConnection {
    edges: [VariantEdge]
  }

  type VariantEdge {
    node: Variant
  }

  type Variant {
    id: ID!
    title: String!
    availableForSale: Boolean!
    selectedOptions: [SelectedOption!]
    price: Price!
  }

  type SelectedOption {
    name: String!
    value: String!
  }

  type ImageConnection {
    edges: [ImageEdge]
  }

  type ImageEdge {
    node: Image
  }

  type Image {
    url: String!
    altText: String
    width: Int
    height: Int
  }

  type SEO {
    description: String!
    title: String!
  }
`;

module.exports = typeDefs;
