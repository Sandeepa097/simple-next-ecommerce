'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CollectionForm from '../../../../components/admin/cms/CollectionForm';

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('key');
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/admin/collections/${id}`)
        .then((res) => res.json())
        .then((data) => setCollection(data));
    }
  }, [id]);

  const handleSubmit = async (updatedCollection) => {
    const res = await fetch(`/api/admin/collections/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCollection),
    });

    if (res.ok) {
      window.location.href = '/admin/collections';
    } else {
      alert('Failed to edit the collection');
    }
  };

  if (!collection) return <p>Loading...</p>;

  return <CollectionForm onSubmit={handleSubmit} initialData={collection} />;
}
