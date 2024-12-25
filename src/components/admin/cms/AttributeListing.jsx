'use client';

import { useEffect, useState } from 'react';
import CollectionListItem from './CollectionListItem';

export default function AttributeListing() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetch('/api/admin/attributes')
      .then((res) => res.json())
      .then((data) => setCollections(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/admin/attributes/${id}`, { method: 'DELETE' });
    setCollections(collections.filter((collection) => collection.id !== id));
  };

  const handleEdit = (collection) => {
    window.location.href = `/admin/attributes/edit?key=${collection.id}`;
  };

  return (
    <div>
      {(!collections || !collections.length) && <span>No attributes</span>}
      {collections.map((collection) => (
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
