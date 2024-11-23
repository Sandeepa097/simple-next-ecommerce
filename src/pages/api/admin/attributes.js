const {
  findAll,
  create,
} = require('../../../../server/services/attributeService');

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const attributes = await findAll();
        res.status(200).json(attributes);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching attributes' });
      }
      break;

    case 'POST':
      try {
        const { name } = req.body;
        const attribute = await create({ name });
        res.status(201).json(attribute);
      } catch (error) {
        res.status(500).json({ message: 'Error creating attribute' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
