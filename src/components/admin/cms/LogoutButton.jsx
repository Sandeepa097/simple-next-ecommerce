'use client';

import LogoutIcon from '../../icons/LogoutIcon';
import { redirect } from 'next/navigation';

export default function LogoutButton() {
  async function handleLogout(e) {
    e.preventDefault();
    const confirm = window.confirm('Are you sure you want to logout?');
    if (!confirm) return;
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
    <li>
      <div
        onClick={handleLogout}
        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer">
        <LogoutIcon />
        <span className="ms-3">Logout</span>
      </div>
    </li>
  );
}
