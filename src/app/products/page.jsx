'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProductListingNavBar from '../../components/frontStore/ProductListingNavBar';
import ProductSearchBar from '../../components/frontStore/ProductSearchBar';
import ProductFilterButton from '../../components/frontStore/ProductFilterButton';
import ProductListing from '../../components/frontStore/ProductListing';
import SortButtonIcon from '../../components/icons/SortButtonIcon';
import FilterButtonIcon from '../../components/icons/FilterButtonIcon';

export default function Page() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`/api/products?search=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [searchQuery]);

  return (
    <div>
      <section className="py-2 antialiased bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
            <ProductListingNavBar order={[{ title: 'Products' }]} />
            <div className="flex items-center space-x-4">
              <ProductSearchBar />
              <ProductFilterButton title="Filters" Icon={FilterButtonIcon} />
              <ProductFilterButton title="Sort" Icon={SortButtonIcon} />
            </div>
          </div>
        </div>
        <div className="px-4">
          <ProductListing products={products} showMore={true} />
        </div>
      </section>
    </div>
  );
}
