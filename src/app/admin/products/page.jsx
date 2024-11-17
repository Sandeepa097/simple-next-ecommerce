import MenuContentHeader from '../../../components/admin/cms/MenuContentHeader';

export default function Page() {
  return (
    <div>
      <MenuContentHeader
        title="Products"
        button={{ text: 'New Product', href: '/admin/products/new' }}
      />
    </div>
  );
}
