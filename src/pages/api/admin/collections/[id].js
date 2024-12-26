const {
  update,
  destroy,
  findOne,
} = require('../../../../../server/services/collectionService');

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const collection = await findOne({ id });
        res.status(200).json(collection);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching collection' });
      }
      break;

    case 'PUT':
      try {
        const { title, description, seoTitle, seoDescription } = req.body;
        await update({ title, description, seoTitle, seoDescription }, { id });
        res.status(200).json({ message: 'Collection updated' });
      } catch (error) {
        res.status(500).json({ message: 'Error updating collection' });
      }
      break;

    case 'DELETE':
      try {
        await destroy({ id });
        res.status(200).json({ message: 'Collection deleted' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting collection' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
