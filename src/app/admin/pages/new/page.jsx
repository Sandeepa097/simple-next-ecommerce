'use client';

import MenuContentHeader from '../../../../components/admin/cms/MenuContentHeader';
import PageForm from '../../../../components/admin/cms/PageForm';

export default function Page() {
  const handleSubmit = async (page) => {
    const res = await fetch('/api/admin/pages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(page),
    });

    if (res.ok) {
      window.location.href = '/admin/pages';
    } else {
      alert('Failed to create page');
    }
  };

  return (
    <div>
      <MenuContentHeader title="Create New Page" />
      <PageForm onSubmit={handleSubmit} />
    </div>
  );
}