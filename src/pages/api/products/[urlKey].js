const { findOne } = require('../../../../server/services/productService');

export default async function handler(req, res) {
  const { method } = req;
  const { urlKey } = req.query;

  switch (method) {
    case 'GET':
      try {
        const product = await findOne({ urlKey });
        res.status(200).json(product);
      } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ message: 'Error fetching product' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
