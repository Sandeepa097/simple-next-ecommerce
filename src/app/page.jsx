import ProductFilterButton from '../components/frontStore/ProductFilterButton';
import ProductListing from '../components/frontStore/ProductListing';
import ProductListingNavBar from '../components/frontStore/ProductListingNavBar';
import FilterButtonIcon from '../components/icons/FilterButtonIcon';
import SortButtonIcon from '../components/icons/SortButtonIcon';

export default function Page() {
  return (
    <div>
      <section className="py-2 antialiased bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
            <ProductListingNavBar
              order={[{ title: 'Electronics', href: '#' }, { title: 'Test' }]}
            />
            <div className="flex items-center space-x-4">
              <ProductFilterButton title="Filters" Icon={FilterButtonIcon} />
              <ProductFilterButton title="Sort" Icon={SortButtonIcon} />
            </div>
          </div>
        </div>
        <div className="px-4">
          <ProductListing showMore={true} />
        </div>
      </section>
    </div>
  );
}
