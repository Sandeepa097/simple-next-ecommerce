const {
  update,
  destroy,
  findOne,
} = require('../../../../../server/services/productService');

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const product = await findOne({ id });
        res.status(200).json(product);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching product' });
      }
      break;

    case 'PUT':
      try {
        const { title, bodySummary, body, seoTitle, seoDescription } = req.body;
        await update(
          {
            title,
            bodySummary,
            body,
            seoTitle,
            seoDescription,
          },
          { id }
        );
        res.status(200).json({ message: 'Product updated' });
      } catch (error) {
        res.status(500).json({ message: 'Error updating product' });
      }
      break;

    case 'DELETE':
      try {
        await destroy({ id });
        res.status(200).json({ message: 'Product deleted' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
