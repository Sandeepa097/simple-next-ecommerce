const {
  findAll,
  create,
} = require('../../../../server/services/categoryService');

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

    case 'POST':
      try {
        const { name, description } = req.body;
        const category = await create({ name, description });
        res.status(201).json(category);
      } catch (error) {
        res.status(500).json({ message: 'Error creating category' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
