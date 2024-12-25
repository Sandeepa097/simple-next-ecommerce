import CollectionListing from '../../../components/admin/cms/CollectionListing';
import MenuContentHeader from '../../../components/admin/cms/MenuContentHeader';

export default function Page() {
  return (
    <div>
      <MenuContentHeader
        title="Collections"
        button={{ text: 'New Collection', href: '/admin/collections/new' }}
      />
      <CollectionListing />
    </div>
  );
}
