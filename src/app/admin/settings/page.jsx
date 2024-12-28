'use client';

import { useEffect, useState } from 'react';
import SettingForm from '../../../components/admin/cms/SettingForm';

export default function Page() {
  const [user, setUser] = useState('');

  async function handleSubmit(settings) {
    const res = await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    });

    if (res.ok) {
      alert('Saved successfully');
    } else {
      alert('Failed to save');
    }
  }

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  if (!user) return <p>Loading...</p>;

  return <SettingForm onSubmit={handleSubmit} initialData={user} />;
}
