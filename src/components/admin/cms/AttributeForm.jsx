'use client';

import { useState } from 'react';
import TextInput from '../../base/TextInput';
import Card from '../../base/Card';
import SubmitButton from '../../base/SubmitButton';

export default function AttributeForm({ onSubmit, initialData = {} }) {
  const [name, setName] = useState(initialData.name || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card title="New Attribute" description="Create a new attribute">
        <TextInput
          label="Name"
          name="name"
          placeholder="Enter the attribute name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <SubmitButton text={initialData?.id ? 'Update' : 'Create'} />
      </Card>
    </form>
  );
}
