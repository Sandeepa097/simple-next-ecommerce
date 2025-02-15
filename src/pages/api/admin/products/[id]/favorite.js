const { update } = require('../../../../../../server/services/productService');

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'PUT':
      try {
        const { isFavorite } = req.body;
        await update({ isFavorite: !!isFavorite }, { id });
        res.status(200).json({ message: 'Favorite status updated' });
      } catch (error) {
        res.status(500).json({ message: 'Error updating favorite status' });
      }
      break;

    default:
      res.setHeader('Allow', ['PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
