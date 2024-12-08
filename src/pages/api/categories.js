const { findAll } = require('../../../server/services/categoryService');

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const categories = await findAll();
        res.status(200).json(categories);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching categories' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
