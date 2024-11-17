import MenuContentHeader from '../../../components/admin/cms/MenuContentHeader';

export default function Page() {
  return (
    <div>
      <MenuContentHeader
        title="Categories"
        button={{ text: 'New Category', href: '/admin/categories/new' }}
      />
    </div>
  );
}
