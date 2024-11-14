import { useRouter } from 'next/router';
import { sessionOptions } from '../../../server/config/session.js';
import { getIronSession } from 'iron-session';

export async function getServerSideProps(context) {
  const session = await getIronSession(context.req, context.res, sessionOptions);

  if (!session?.user) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
}

export default function Index({ user }) {
  const router = useRouter();
  
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/admin/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      router.push('/admin/login');
    } else {
      alert('Something went wrong');
    }
  }

  return <div>
    <div>Welcome, {user.username}!</div>
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 max-w-md mx-auto p-4">
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">Logout</button>
    </form>
  </div>;
}
