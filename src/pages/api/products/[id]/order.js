const {
  getCheckOutUrl,
} = require('../../../../../server/services/orderService');

export default async function handler(req, res) {
  const { method } = req;
  const { id, url } = req.query;

  switch (method) {
    case 'GET':
      try {
        const checkOutUrl = await getCheckOutUrl(id, url);
        res.writeHead(302, { Location: checkOutUrl });
        res.end();
      } catch (error) {
        res.status(500).json({ message: 'Error placing order' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
