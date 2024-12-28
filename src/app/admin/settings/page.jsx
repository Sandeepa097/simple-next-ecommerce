'use client';

import { useEffect, useState } from 'react';
import SettingForm from '../../../components/admin/cms/SettingForm';

export default function Page() {
  const [contactWhatsapp, setContactWhatsapp] = useState('');

  async function fetchSettings() {
    const res = await fetch('/api/admin/settings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      const data = await res.json();
      return data.user;
    }

    return null;
  }

  async function handleSubmit(settings) {
    e.preventDefault();
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
    const setSettings = async () => {
      const user = await fetchSettings();
      if (user && user.contactWhatsapp) {
        setContactWhatsapp(user.contactWhatsapp);
      }
    };

    setSettings();
  }, []);

  return (
    <SettingForm onSubmit={handleSubmit} initialData={{ contactWhatsapp }} />
  );
}
