'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageForm from '../../../../components/admin/cms/PageForm';
import MenuContentHeader from '../../../../components/admin/cms/MenuContentHeader';

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('key');
  const [page, setPage] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/admin/pages/${id}`)
        .then((res) => res.json())
        .then((data) => setPage(data));
    }
  }, [id]);

  const handleSubmit = async (updatedPage) => {
    const res = await fetch(`/api/admin/pages/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPage),
    });

    if (res.ok) {
      window.location.href = '/admin/pages';
    } else {
      alert('Failed to edit the page');
    }
  };

  if (!page) return <p>Loading...</p>;

  return (
    <div>
      <MenuContentHeader title="Edit Page" />
      <PageForm onSubmit={handleSubmit} initialData={page} />
    </div>
  );
}
