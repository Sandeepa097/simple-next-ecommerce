const { gql } = require('apollo-server-micro');

const typeDefs = gql`
  enum CollectionSortKeys {
    TITLE = 'title'
    UPDATED_AT = 'updatedAt'
  }

  enum ProductCollectionSortKeys {
    TITLE = 'title'
    UPDATED_AT = 'updatedAt'
    PRICE = 'price'
    RELEVANCE = 'relevance'
  }

  enum ProductSortKeys {
    TITLE = 'title'
    UPDATED_AT = 'updatedAt'
    PRICE = 'price'
    RELEVANCE = 'relevance'
  }

  type Query {
    collections(first: Int, sortKey: CollectionSortKeys): CollectionConnection
    collection(handle: String!): Collection
    menu(handle: String!): Menu
    pageByHandle(handle: String!): Page
    pages(first: Int): PageConnection
    product(handle: String!): Product
    products(
      sortKey: ProductSortKeys
      reverse: Boolean
      query: String
      first: Int
    ): ProductConnection
    productRecommendations(productId: ID!): [Product]
  }

  type CollectionConnection {
    edges: [CollectionEdge]
  }

  type CollectionEdge {
    node: Collection
  }

  type Collection {
    handle: String
    title: String
    description: String
    seo: SEO
    updatedAt: String
    products(
      sortKey: ProductCollectionSortKeys
      reverse: Boolean
      first: Int
    ): ProductConnection
  }

  type Menu {
    items: [MenuItem]
  }

  type MenuItem {
    title: String
    url: String
  }

  type SEO {
    description: String
    title: String
  }

  type ProductConnection {
    edges: [ProductEdge]
  }

  type ProductEdge {
    node: Product
  }

  type Product {
    id: ID
    handle: String
    availableForSale: Boolean
    title: String
    description: String
    descriptionHtml: String
    options: [ProductOption]
    priceRange: PriceRange
    variants(first: Int): VariantConnection
    featuredImage: Image
    images(first: Int): ImageConnection
    seo: SEO
    tags: [String]
    updatedAt: String
  }

  type ProductOption {
    id: ID
    name: String
    values: [String]
  }

  type PriceRange {
    maxVariantPrice: Price
    minVariantPrice: Price
  }

  type Price {
    amount: String
    currencyCode: String
  }

  type VariantConnection {
    edges: [VariantEdge]
  }

  type VariantEdge {
    node: Variant
  }

  type Variant {
    id: ID
    title: String
    availableForSale: Boolean
    selectedOptions: [SelectedOption]
    price: Price
  }

  type SelectedOption {
    name: String
    value: String
  }

  type ImageConnection {
    edges: [ImageEdge]
  }

  type ImageEdge {
    node: Image
  }

  type Image {
    url: String
    altText: String
    width: Int
    height: Int
  }

  type Page {
    id: ID!
    title: String
    handle: String
    body: String
    bodySummary: String
    seo: SEO
    createdAt: String
    updatedAt: String
  }

  type PageEdge {
    node: Page
  }

  type PageConnection {
    edges: [PageEdge]
  }
`;

module.exports = typeDefs;
