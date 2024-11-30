'use client';

import { useEffect, useState } from 'react';
import ProductListItem from './ProductListItem';

export default function ProductListing() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/admin/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEdit = (product) => {
    window.location.href = `/admin/products/edit?key=${product.id}`;
  };

  return (
    <div>
      {(!products || !products.length) && <span>No products</span>}
      {products.map((product) => (
        <ProductListItem
          key={product.id}
          product={product}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
