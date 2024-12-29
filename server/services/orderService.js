const { Product, User } = require('../models');

const getCheckOutUrl = async (productId, url) => {
  const product = await Product.findOne({ where: { id: productId } });

  if (!product) {
    throw new Error('Product not found');
  }

  const variantOptions = url
    .split('?')[1]
    .split('&')
    .map((option) => {
      const [key, value] = option.split('=');
      return { key, value };
    });

  const whatsappMessage = `I would like to order "${
    product.title
  }" with the following options: "${variantOptions
    .map((option) => `${option.key}: ${option.value}`)
    .join(', ')}"\n\n${url}`;

  const admin = await User.findOne({
    attributes: ['contactWhatsapp'],
  });

  return `https://wa.me/94${admin.contactWhatsapp}?text=${encodeURIComponent(
    whatsappMessage
  )}`;
};

module.exports = {
  getCheckOutUrl,
};
