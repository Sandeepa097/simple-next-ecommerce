'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CategoryForm from '../../../../components/admin/cms/CategoryForm';
import MenuContentHeader from '../../../../components/admin/cms/MenuContentHeader';

export default function EditCategory() {
  const searchParams = useSearchParams();
  const id = searchParams.get('key');
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/admin/categories/${id}`)
        .then((res) => res.json())
        .then((data) => setCategory(data));
    }
  }, [id]);

  const handleSubmit = async (updatedCategory) => {
    const res = await fetch(`/api/admin/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCategory),
    });

    if (res.ok) {
      window.location.href = '/admin/categories';
    } else {
      alert('Failed to edit the category');
    }
  };

  if (!category) return <p>Loading...</p>;

  return (
    <div>
      <MenuContentHeader title="Edit Category" />
      <CategoryForm onSubmit={handleSubmit} initialData={category} />
    </div>
  );
}
