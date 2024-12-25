const { findOne } = require('../../../../server/services/collectionService');

export default async function handler(req, res) {
  const { method } = req;
  const { urlKey } = req.query;

  switch (method) {
    case 'GET':
      try {
        const collection = await findOne({ urlKey });
        res.status(200).json(collection);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching collection' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
