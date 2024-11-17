import { NextResponse } from 'next/server';
const { getIronSession } = require('iron-session');
const { sessionOptions } = require('../../../../server/config/session');
const { authenticate } = require('../../../../server/services/authService');

export default async function handler(req, res) {
  const session = await getIronSession(req, res, sessionOptions);

  if (req.method === 'POST') {
    const { username, password } = req.body;

    const authenticatedUser = await authenticate(username, password);
    if (authenticatedUser) {
      session.user = authenticatedUser;
      await session.save();
      res.status(200).json({ message: 'Logged in successfully' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
