import NavigationMenu from '../../components/admin/cms/NavigationMenu';

export default function Template({ children }) {
  return (
    <div>
      <NavigationMenu>{children}</NavigationMenu>
    </div>
  );
}
