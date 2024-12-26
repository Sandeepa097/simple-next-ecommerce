const productService = require('../../../../../server/services/productService');
const fileService = require('../../../../../server/services/fileService');
const productImageService = require('../../../../../server/services/productImageService');
const productVariantService = require('../../../../../server/services/productVariantService');
const productVariantAttributeValueService = require('../../../../../server/services/productVariantAttributeValueService');

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const product = await productService.findOne({ id });
        res.status(200).json(product);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching product' });
      }
      break;

    case 'PUT':
      put(req, res);
      break;

    case 'DELETE':
      try {
        await productService.destroy({ id });
        res.status(200).json({ message: 'Product deleted' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function put(req, res) {
  const productId = req.query.id;

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

    await productService.update(
      {
        collectionId,
        title,
        description,
        descriptionHtml,
        availableForSale,
        seoTitle,
        seoDescription,
        ...(featuredImageId
          ? {
              featuredImageUrl: featuredImageId,
              featuredImageAltText: title,
              featuredImageWidth: 800,
              featuredImageHeight: 800,
            }
          : {}),
      },
      { id: productId }
    );

    if (images && images.length) {
      await productImageService.deleteByProductId(productId);

      for (const productImage of images) {
        const productImageId = await fileService.moveTemp(
          productImage,
          'storage/products'
        );

        await productImageService.create({
          productId,
          url: productImageId || productImage,
          altText: title,
          width: 800,
          height: 800,
        });
      }
    }

    if (variants && variants.length) {
      await productVariantService.deleteByProductId(productId);

      for (const variant of variants) {
        const { title, currencyCode, price, availableForSale, ...attributes } =
          variant;

        const createdVariant = await productVariantService.create({
          productId,
          title,
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
    }

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update product: ' + error });
  }
}
