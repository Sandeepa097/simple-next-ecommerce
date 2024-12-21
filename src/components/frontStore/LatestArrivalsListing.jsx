'use client';

import { useEffect, useState } from 'react';
import ProductListing from './ProductListing';

export default function LatestArrivalListing() {
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products?limit=10&latest')
      .then((res) => res.json())
      .then((data) => setLatestProducts(data));
  }, []);

  return <ProductListing products={latestProducts} />;
}
