const fileService = require('../../../../server/services/fileService');
const productService = require('../../../../server/services/productService');
const productImageService = require('../../../../server/services/productImageService');
const productVariantService = require('../../../../server/services/productVariantService');
const productVariantAttributeValueService = require('../../../../server/services/productVariantAttributeValueService');

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const products = await productService.findAll();
        res.status(200).json(products);
      } catch (error) {
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
  const { name, description, categoryId, images, image, variants } = req.body;

  try {
    const imageId = await fileService.moveTemp(image, 'storage/products');

    const product = await productService.create({
      categoryId,
      name,
      description,
      image: imageId,
    });

    for (const productImage of images) {
      const productImageId = await fileService.moveTemp(
        productImage,
        'storage/products'
      );

      await productImageService.create({
        productId: product.id,
        image: productImageId,
      });
    }

    for (const variant of variants) {
      const { price, isAvailable, variantImage, ...attributes } = variant;

      const createdVariant = await productVariantService.create({
        productId: product.id,
        price,
        isAvailable,
        variantImage: variantImage,
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
    res.status(500).json({ message: 'Failed to create product' });
  }
}
