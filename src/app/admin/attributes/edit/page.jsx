'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import AttributeForm from '../../../../components/admin/cms/AttributeForm';

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('key');
  const [attribute, setAttribute] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/admin/attributes/${id}`)
        .then((res) => res.json())
        .then((data) => setAttribute(data));
    }
  }, [id]);

  const handleSubmit = async (updatedAttribute) => {
    const res = await fetch(`/api/admin/attributes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedAttribute),
    });

    if (res.ok) {
      window.location.href = '/admin/attributes';
    } else {
      alert('Failed to edit the attribute');
    }
  };

  if (!attribute) return <p>Loading...</p>;

  return <AttributeForm onSubmit={handleSubmit} initialData={attribute} />;
}
