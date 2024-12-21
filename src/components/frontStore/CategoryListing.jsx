'use client';

import { useEffect, useState } from 'react';
import CategoryListItem from './CategoryListItem';

export default function CategoryListing() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div>
      <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <CategoryListItem
            key={category.id}
            urlKey={category.urlKey}
            name={category.name}
            image={category.image}
          />
        ))}
      </div>
    </div>
  );
}
