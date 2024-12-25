'use client';

import { useEffect, useState } from 'react';
import CollectionListItem from './CollectionListItem';

export default function AttributeListing() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/admin/attributes')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/admin/attributes/${id}`, { method: 'DELETE' });
    setCategories(categories.filter((collection) => collection.id !== id));
  };

  const handleEdit = (collection) => {
    window.location.href = `/admin/attributes/edit?key=${collection.id}`;
  };

  return (
    <div>
      {(!categories || !categories.length) && <span>No attributes</span>}
      {categories.map((collection) => (
        <CollectionListItem
          key={collection.id}
          collection={collection}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
