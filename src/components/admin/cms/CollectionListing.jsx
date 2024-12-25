'use client';

import { useEffect, useState } from 'react';
import CollectionListItem from './CollectionListItem';

export default function CollectionListing() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetch('/api/admin/collections')
      .then((res) => res.json())
      .then((data) => setCollections(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/admin/collections/${id}`, { method: 'DELETE' });
    setCollections(collections.filter((collection) => collection.id !== id));
  };

  const handleEdit = (collection) => {
    window.location.href = `/admin/collections/edit?key=${collection.id}`;
  };

  return (
    <div>
      {(!collections || !collections.length) && <span>No collections</span>}
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
