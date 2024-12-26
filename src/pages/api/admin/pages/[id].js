const {
  update,
  destroy,
  findOne,
} = require('../../../../../server/services/pageService');

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const page = await findOne({ id });
        res.status(200).json(page);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching page' });
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
        res.status(200).json({ message: 'Page updated' });
      } catch (error) {
        res.status(500).json({ message: 'Error updating page' });
      }
      break;

    case 'DELETE':
      try {
        await destroy({ id });
        res.status(200).json({ message: 'Page deleted' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting page' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
