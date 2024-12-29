const { getIronSession } = require('iron-session');
const { sessionOptions } = require('../../../../server/config/session');
const { authenticate } = require('../../../../server/services/authService');
const { update } = require('../../../../server/services/userService');

export default async function handler(req, res) {
  const session = await getIronSession(req, res, sessionOptions);

  if (req.method === 'PATCH') {
    const { oldPassword, newPassword } = req.body;
    const authenticatedUser = await authenticate(
      session.user.username,
      oldPassword
    );
    if (!authenticatedUser) {
      return res.status(401).json({ message: 'Old password is incorrect' });
    }
    await update(
      { password: newPassword },
      { username: session.user.username }
    );
    res.status(200).json({ message: 'Password updated successfully' });
  } else {
    res.setHeader('Allow', ['PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
