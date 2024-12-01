const { findOne } = require('../../../../server/services/categoryService');

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const category = await findOne({ id });
        res.status(200).json(category);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching category' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
