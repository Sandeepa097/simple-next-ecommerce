const { getIronSession } = require('iron-session');
const { sessionOptions } = require('../../../../server/config/session');
const { update, findOne } = require('../../../../server/services/userService');

export default async function handler(req, res) {
  const session = await getIronSession(req, res, sessionOptions);

  if (req.method === 'GET') {
    const user = await findOne({ username: session.user.username });
    res.status(200).json({ user });
  } else if (req.method === 'PATCH') {
    const { contactWhatsapp } = req.body;
    await update({ contactWhatsapp }, { username: session.user.username });
    res.status(200).json({ message: 'User updated successfully' });
  } else {
    res.setHeader('Allow', ['GET', 'PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
