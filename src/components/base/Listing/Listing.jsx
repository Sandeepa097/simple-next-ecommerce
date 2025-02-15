'use client';

import { useState } from 'react';
import ListingItem from './ListingItem';

export default function Listing({ items, emptyMessage, actionUrl }) {
  const [updatedItems, setUpdatedItems] = useState(items);

  async function onDelete(id) {
    try {
      const response = await fetch(`${actionUrl}/${id}`, {
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

  async function onChangeFavorite(id, value) {
    try {
      const response = await fetch(`${actionUrl}/${id}/favorite`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isFavorite: value,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update favorite status');
      }

      const updatedItem = updatedItems.find((item) => item.id === id);
      updatedItem.isFavorite = value;

      setUpdatedItems([...updatedItems]);
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
        <ListingItem
          key={item.id}
          item={item}
          onDelete={onDelete}
          onChangeFavorite={onChangeFavorite}
        />
      ))}
    </div>
  );
}
