const {
  update,
  destroy,
  findOne,
} = require('../../../../../server/services/categoryService');

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

    case 'PUT':
      try {
        const { name, description } = req.body;
        await update({ name, description }, { id });
        res.status(200).json({ message: 'Category updated' });
      } catch (error) {
        res.status(500).json({ message: 'Error updating category' });
      }
      break;

    case 'DELETE':
      try {
        await destroy({ id });
        res.status(200).json({ message: 'Category deleted' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting category' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
