'use client';

import CollectionForm from '../../../../components/admin/cms/CollectionForm';

export default function Page() {
  const handleSubmit = async (collection) => {
    const res = await fetch('/api/admin/collections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(collection),
    });

    if (res.ok) {
      window.location.href = '/admin/collections';
    } else {
      alert('Failed to create collection');
    }
  };

  return <CollectionForm onSubmit={handleSubmit} />;
}
