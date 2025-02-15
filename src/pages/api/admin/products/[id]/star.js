const { update } = require('../../../../../../server/services/productService');

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'PUT':
      try {
        const { isStar } = req.body;
        await update({ isStar: !!isStar }, { id });
        res.status(200).json({ message: 'Star status updated' });
      } catch (error) {
        res.status(500).json({ message: 'Error updating star status' });
      }
      break;

    default:
      res.setHeader('Allow', ['PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
