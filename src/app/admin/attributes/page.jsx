import AttributeListing from '../../../components/admin/cms/AttributeListing';
import MenuContentHeader from '../../../components/admin/cms/MenuContentHeader';

export default function Page() {
  return (
    <div>
      <MenuContentHeader
        title="Attributes"
        button={{ text: 'New Attribute', href: '/admin/attributes/new' }}
      />
      <AttributeListing />
    </div>
  );
}
