'use client';

import ProductForm from '../../../../components/admin/cms/ProductForm';

export default function Page() {
  const handleSubmit = async (product) => {
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    if (res.ok) {
      window.location.href = '/admin/products';
    } else {
      alert('Failed to create product');
    }
  };

  return <ProductForm onSubmit={handleSubmit} />;
}
