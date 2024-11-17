'use client';

import { useEffect, useState } from 'react';
import FormWrapper from '../../../components/base/FormWrapper';
import Input from '../../../components/base/Input';
import Button from '../../../components/base/Button';

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

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contactWhatsapp }),
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
    <div>
      <FormWrapper>
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Settings
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            className="mt-2"
            type="text"
            placeholder="Whatsapp Number"
            value={contactWhatsapp}
            prefix="+94"
            onChange={(e) => setContactWhatsapp(e.target.value)}
          />
          <Button className="mt-2" type="submit">
            Save
          </Button>
        </form>
      </FormWrapper>
    </div>
  );
}
