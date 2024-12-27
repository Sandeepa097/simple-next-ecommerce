'use client';

import AttributeForm from '../../../../components/admin/cms/AttributeForm';

export default function Page() {
  const handleSubmit = async (collection) => {
    const res = await fetch('/api/admin/attributes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(collection),
    });

    if (res.ok) {
      window.location.href = '/admin/attributes';
    } else {
      alert('Failed to create attribute');
    }
  };

  return <AttributeForm onSubmit={handleSubmit} />;
}
