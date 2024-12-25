const { findAll } = require('../../../server/services/collectionService');

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const collections = await findAll();
        res.status(200).json(collections);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching collections' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
