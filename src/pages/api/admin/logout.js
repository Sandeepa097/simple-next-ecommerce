const { getIronSession } = require('iron-session');
const { sessionOptions } = require('../../../../server/config/session');

export default async function handler(req, res) {
  const session = await getIronSession(req, res, sessionOptions);

  if (req.method === 'POST') {
    session.destroy();
    res.status(200).json({ message: 'Logged out successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
