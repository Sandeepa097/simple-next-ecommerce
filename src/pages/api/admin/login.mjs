// src/pages/api/admin/login.mjs
import { getIronSession } from 'iron-session';
import { sessionOptions } from '../../../../server/config/session.mjs';
import { User } from '../../../../server/models/index.mjs';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (user && user.password === password) {
      req.session = user; // Save user details in session
      await req.session.save();
      res.status(200).json({ message: 'Logged in successfully' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default getIronSession(handler, sessionOptions);
