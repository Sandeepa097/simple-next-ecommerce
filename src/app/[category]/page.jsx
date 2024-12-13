'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import ProductFilterButton from '../../components/frontStore/ProductFilterButton';
import ProductListing from '../../components/frontStore/ProductListing';
import ProductListingNavBar from '../../components/frontStore/ProductListingNavBar';
import FilterButtonIcon from '../../components/icons/FilterButtonIcon';
import SortButtonIcon from '../../components/icons/SortButtonIcon';
import ProductSearchBar from '../../components/frontStore/ProductSearchBar';

export default function Page() {
  const params = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`/api/categories/${params.category}`)
      .then((res) => res.json())
      .then((data) => setCategory(data));

    fetch(`/api/categories/${params.category}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [params]);

  return (
    <div>
      <section className="py-2 antialiased bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
            <ProductListingNavBar order={[{ title: category?.name }]} />
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
