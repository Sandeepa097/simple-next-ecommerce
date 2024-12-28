'use client';

import { useState } from 'react';
import ListingItem from './ListingItem';

export default function Listing({ items, emptyMessage, deleteUrl }) {
  const [updatedItems, setUpdatedItems] = useState(items);

  async function onDelete(id) {
    try {
      const response = await fetch(`${deleteUrl}/${id}`, {
        method: 'DELETE',
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      setUpdatedItems(updatedItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mt-2">
      {(!updatedItems || !updatedItems.length) && (
        <span>{emptyMessage || 'No items found'}</span>
      )}
      {updatedItems.map((item) => (
        <ListingItem key={item.id} item={item} onDelete={onDelete} />
      ))}
    </div>
  );
}
