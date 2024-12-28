'use client';

import { useState } from 'react';
import TextInput from '../../base/TextInput';
import Card from '../../base/Card';
import SubmitButton from '../../base/SubmitButton';

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
        <TextInput
          label="WhatsApp Number"
          name="contactWhatsapp"
          placeholder="Enter the WhatsApp number"
          prefix="+94"
          value={contactWhatsapp}
          onChange={(e) => setContactWhatsapp(e.target.value)}
        />

        <SubmitButton text="Save" />
      </Card>
    </form>
  );
}
