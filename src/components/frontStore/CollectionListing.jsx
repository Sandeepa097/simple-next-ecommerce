'use client';

import { useEffect, useState } from 'react';
import CollectionListItem from './CollectionListItem';

export default function CollectionListing() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/collections')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div>
      <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((collection) => (
          <CollectionListItem
            key={collection.id}
            urlKey={collection.urlKey}
            name={collection.name}
            image={collection.image}
          />
        ))}
      </div>
    </div>
  );
}
