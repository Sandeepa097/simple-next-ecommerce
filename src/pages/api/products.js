const { searchByName } = require('../../../server/services/productService');

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const searchQuery = req.query.search;
        const products = await searchByName(searchQuery);
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
