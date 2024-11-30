import MenuContentHeader from '../../../components/admin/cms/MenuContentHeader';
import ProductListing from '../../../components/admin/cms/ProductListing';

export default function Page() {
  return (
    <div>
      <MenuContentHeader
        title="Products"
        button={{ text: 'New Product', href: '/admin/products/new' }}
      />
      <ProductListing />
    </div>
  );
}
