import { withSession } from '../../../utils/withSession.mjs';

export default withSession(async (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: 'Logged out successfully' });
});
