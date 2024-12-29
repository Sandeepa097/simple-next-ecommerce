import { notFound } from 'next/navigation';
import ProductFilterButton from '../../components/frontStore/ProductFilterButton';
import ProductListing from '../../components/frontStore/ProductListing';
import ProductListingNavBar from '../../components/frontStore/ProductListingNavBar';
import FilterButtonIcon from '../../components/icons/FilterButtonIcon';
import SortButtonIcon from '../../components/icons/SortButtonIcon';
import ProductSearchBar from '../../components/frontStore/ProductSearchBar';

export default async function Page(props) {
  const params = await props.params;
  const collectionResponse = await fetch(
    `${process.env.NEXT_PUBLIC_ORIGIN}/api/collections/${params.collection}`
  );

  if (!collectionResponse.ok) {
    return notFound();
  }

  const collection = await collectionResponse.json();

  const productsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_ORIGIN}/api/collections/${params.collection}/products`
  );
  const products = await productsResponse.json();

  return (
    <div>
      <section className="py-2 antialiased bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
            <ProductListingNavBar order={[{ title: collection?.name }]} />
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
