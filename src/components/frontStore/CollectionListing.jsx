'use client';

import { useEffect, useState } from 'react';
import CollectionListItem from './CollectionListItem';

export default function CollectionListing() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetch('/api/collections')
      .then((res) => res.json())
      .then((data) => setCollections(data));
  }, []);

  return (
    <div>
      <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
        {collections.map((collection) => (
          <CollectionListItem
            key={collection.id}
            id={collection.id}
            name={collection.name}
            image={collection.image}
          />
        ))}
      </div>
    </div>
  );
}
