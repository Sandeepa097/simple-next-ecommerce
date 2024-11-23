'use client';

import { useEffect, useState } from 'react';
import CategoryListItem from './CategoryListItem';

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/admin/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleEdit = (category) => {
    window.location.href = `/admin/categories/edit?key=${category.id}`;
  };

  return (
    <div>
      {(!categories || !categories.length) && <span>No categories</span>}
      {categories.map((category) => (
        <CategoryListItem
          key={category.id}
          category={category}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
