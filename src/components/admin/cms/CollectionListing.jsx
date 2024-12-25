'use client';

import { useEffect, useState } from 'react';
import CollectionListItem from './CollectionListItem';

export default function CollectionListing() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/admin/collections')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/admin/collections/${id}`, { method: 'DELETE' });
    setCategories(categories.filter((collection) => collection.id !== id));
  };

  const handleEdit = (collection) => {
    window.location.href = `/admin/collections/edit?key=${collection.id}`;
  };

  return (
    <div>
      {(!categories || !categories.length) && <span>No categories</span>}
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
