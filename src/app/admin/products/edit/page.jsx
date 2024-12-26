'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductForm from '../../../../components/admin/cms/ProductForm';
import MenuContentHeader from '../../../../components/admin/cms/MenuContentHeader';

export default function Product() {
  const searchParams = useSearchParams();
  const id = searchParams.get('key');
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/admin/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    }
  }, [id]);

  const handleSubmit = async (updatedProduct) => {
    const res = await fetch(`/api/admin/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    });

    if (res.ok) {
      window.location.href = '/admin/products';
    } else {
      alert('Failed to edit the product');
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <MenuContentHeader title="Edit Product" />
      <ProductForm onSubmit={handleSubmit} initialData={product} />
    </div>
  );
}
