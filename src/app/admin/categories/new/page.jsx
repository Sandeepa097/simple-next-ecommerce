'use client';

import MenuContentHeader from '../../../../components/admin/cms/MenuContentHeader';
import CategoryForm from '../../../../components/admin/cms/CategoryForm';

export default function Page() {
  const handleSubmit = async (category) => {
    const res = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });

    if (res.ok) {
      window.location.href = '/admin/categories';
    } else {
      alert('Failed to create category');
    }
  };

  return (
    <div>
      <MenuContentHeader title="Create New Category" />
      <CategoryForm onSubmit={handleSubmit} />
    </div>
  );
}
