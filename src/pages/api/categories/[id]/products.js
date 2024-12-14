const { findAll } = require('../../../../../server/services/productService');

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const products = await findAll({ categoryId: id });
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
