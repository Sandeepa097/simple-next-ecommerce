const { viewCategory } = require('../../../../../server/services/fileService');

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const data = await viewCategory(id);
        if (!data) {
          res.status(400).json({ message: 'File not found' });
        }
        res.writeHead(200, { 'Content-Type': data.contentType });
        res.end(data.content);
      } catch (error) {
        res.status(500).json({ message: 'Error previewing file' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
