'use client';

import { redirect } from 'next/navigation';

export default function Page({ user }) {
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/admin/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      redirect('/admin/auth');
    } else {
      alert('Something went wrong');
    }
  }

  return (
    <div>
      <div>Welcome, Admin!</div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 max-w-md mx-auto p-4">
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Logout
        </button>
      </form>
    </div>
  );
}
