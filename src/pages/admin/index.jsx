// src/pages/admin/dashboard.jsx
import { sessionOptions } from '../../../server/config/session.mjs';
import { getIronSession } from 'iron-session';

export async function getServerSideProps(context) {
  await getIronSession(context.req, context.res, sessionOptions);
  const user = context.req.session?.user;

  if (!user) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
}

export default function Dashboard({ user }) {
  return <div>Welcome, {user.username}!</div>;
}
