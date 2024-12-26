import PageListing from '../../../components/admin/cms/PageListing';
import MenuContentHeader from '../../../components/admin/cms/MenuContentHeader';

export default function Page() {
  return (
    <div>
      <MenuContentHeader
        title="Pages"
        button={{ text: 'New Page', href: '/admin/pages/new' }}
      />
      <PageListing />
    </div>
  );
}
