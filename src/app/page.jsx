import CollectionListing from '../components/frontStore/CollectionListing';
import LatestArrivalListing from '../components/frontStore/LatestArrivalsListing';
import ProductListingNavBar from '../components/frontStore/ProductListingNavBar';
import ProductSearchBar from '../components/frontStore/ProductSearchBar';

export default function Page() {
  return (
    <div>
      <section className="py-2 antialiased bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
            <ProductListingNavBar />
            <div className="flex items-center space-x-4">
              <ProductSearchBar />
            </div>
          </div>
        </div>
        <div className="px-4">
          <CollectionListing />
        </div>
        <div className="px-4">
          <LatestArrivalListing />
        </div>
      </section>
    </div>
  );
}
