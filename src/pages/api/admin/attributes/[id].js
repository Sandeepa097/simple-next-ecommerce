const {
  update,
  destroy,
  findOne,
} = require('../../../../../server/services/attributeService');

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const attribute = await findOne({ id });
        res.status(200).json(attribute);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching attribute' });
      }
      break;

    case 'PUT':
      try {
        const { name } = req.body;
        await update({ name }, { id });
        res.status(200).json({ message: 'Attribute updated' });
      } catch (error) {
        res.status(500).json({ message: 'Error updating attribute' });
      }
      break;

    case 'DELETE':
      try {
        await destroy({ id });
        res.status(200).json({ message: 'Attribute deleted' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting attribute' });
      }
      break;

    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
