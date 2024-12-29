'use client';

import { useState } from 'react';
import TextInput from '../../base/TextInput';
import Card from '../../base/Card';
import SubmitButton from '../../base/SubmitButton';
import Link from 'next/link';

export default function SettingForm({ onSubmit, initialData = {} }) {
  const [contactWhatsapp, setContactWhatsapp] = useState(
    initialData.contactWhatsapp || ''
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ contactWhatsapp });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card title="Settings" description="Change the settings">
        <div className="md:col-span-5 flex items-center justify-end">
          <Link
            href="/admin/password"
            className="p-2 bg-blue-500 text-white rounded">
            Change Password
          </Link>
        </div>
        <TextInput
          label="WhatsApp Number"
          name="contactWhatsapp"
          placeholder="Enter the WhatsApp number"
          prefix="+94"
          value={contactWhatsapp}
          onChange={(e) => setContactWhatsapp(e.target.value)}
          maxLength={255}
          required={true}
        />

        <SubmitButton text="Save" />
      </Card>
    </form>
  );
}
