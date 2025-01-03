import { Op } from 'sequelize';

const fileService = require('../../../../server/services/fileService');
const productService = require('../../../../server/services/productService');
const productImageService = require('../../../../server/services/productImageService');
const productVariantService = require('../../../../server/services/productVariantService');
const productVariantAttributeValueService = require('../../../../server/services/productVariantAttributeValueService');

const getSequelizeOptions = (query) => {
  let options = {};

  if (query.search) {
    options = {
      ...options,
      where: {
        title: { [Op.like]: `%${query.search}%` },
      },
    };
  }

  if (query.latest) {
    options = {
      ...options,
      order: [...(options.order || []), ['createdAt', 'DESC']],
    };
  }

  if (query.limit) {
    options = {
      ...options,
      limit: Number(query.limit),
    };
  }

  if (query.offset) {
    options = {
      ...options,
      offset: Number(query.offset),
    };
  }

  return options;
};

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const options = getSequelizeOptions(req.query);
        const products = await productService.findAll({ ...options });
        const count = await productService.count();
        res.status(200).json({ products, count });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products' });
      }
      break;

    case 'POST':
      post(req, res);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function post(req, res) {
  const {
    title,
    description,
    descriptionHtml,
    collectionId,
    featuredImage,
    images,
    availableForSale,
    seoTitle,
    seoDescription,
    variants,
  } = req.body;

  try {
    const featuredImageId = await fileService.moveTemp(
      featuredImage,
      'storage/products'
    );

    const product = await productService.create({
      collectionId: collectionId || null,
      title,
      description,
      descriptionHtml,
      availableForSale,
      seoTitle,
      seoDescription,
      featuredImageUrl: featuredImageId,
      featuredImageAltText: title,
      featuredImageWidth: 80,
      featuredImageHeight: 80,
    });

    for (const productImage of images) {
      const productImageId = await fileService.moveTemp(
        productImage,
        'storage/products'
      );

      await productImageService.create({
        productId: product.id,
        url: productImageId,
        altText: product.title,
        width: 800,
        height: 800,
      });
    }

    for (const variant of variants) {
      const { title, currencyCode, price, availableForSale, ...attributes } =
        variant;

      const createdVariant = await productVariantService.create({
        productId: product.id,
        title: title,
        currencyCode,
        price,
        availableForSale,
      });

      for (const [attrId, attrValue] of Object.entries(attributes)) {
        await productVariantAttributeValueService.create({
          productVariantId: createdVariant.id,
          attributeId: attrId,
          value: attrValue,
        });
      }
    }

    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create product: ' + error });
  }
}
