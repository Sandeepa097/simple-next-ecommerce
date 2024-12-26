'use client';

import { useEffect, useState } from 'react';
import PageListItem from './PageListItem';

export default function PageListing() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetch('/api/admin/pages')
      .then((res) => res.json())
      .then((data) => setPages(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/admin/pages/${id}`, { method: 'DELETE' });
    setPages(pages.filter((page) => page.id !== id));
  };

  const handleEdit = (page) => {
    window.location.href = `/admin/pages/edit?key=${page.id}`;
  };

  return (
    <div>
      {(!pages || !pages.length) && <span>No pages</span>}
      {pages.map((page) => (
        <PageListItem
          key={page.id}
          page={page}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
