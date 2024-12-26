const { findAll, create } = require('../../../../server/services/pageService');

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const pages = await findAll();
        res.status(200).json(pages);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching pages' });
      }
      break;

    case 'POST':
      try {
        const { title, bodySummary, body, seoTitle, seoDescription } = req.body;
        const page = await create({
          title,
          bodySummary,
          body,
          seoTitle,
          seoDescription,
        });
        res.status(201).json(page);
      } catch (error) {
        res.status(500).json({ message: 'Error creating page' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
