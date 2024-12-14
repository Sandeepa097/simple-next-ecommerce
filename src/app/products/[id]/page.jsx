'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Page() {
  const params = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [params]);

  return (
    <div>
      <section className="py-2 antialiased bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
            {JSON.stringify(product)}
          </div>
        </div>
      </section>
    </div>
  );
}
