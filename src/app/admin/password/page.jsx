'use client';

import PasswordForm from '../../../components/admin/cms/PasswordForm';

export default function Page() {
  async function handleSubmit(passwords) {
    const res = await fetch('/api/admin/password', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwords),
    });

    if (res.ok) {
      alert('Password updated successfully');
    } else {
      if (res.status === 401) {
        alert('Old password is incorrect');
        return;
      }
      alert('Failed to update');
    }
  }

  return <PasswordForm onSubmit={handleSubmit} />;
}
