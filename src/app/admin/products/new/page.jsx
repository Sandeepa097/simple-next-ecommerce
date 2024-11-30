import MenuContentHeader from '../../../../components/admin/cms/MenuContentHeader';
import ProductForm from '../../../../components/admin/cms/ProductForm';

export default function Page() {
  return (
    <div>
      <div>
        <MenuContentHeader title="Create New Product" />
        <ProductForm />
      </div>
    </div>
  );
}
