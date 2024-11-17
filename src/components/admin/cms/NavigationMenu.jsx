'use client';

import ProductMenuIcon from '../../icons/ProductMenuIcon';
import NavigationItem from './NavigationItem';

export default function NavigationMenu({ children }) {
  const items = [
    {
      id: 1,
      title: 'Products',
      Icon: ProductMenuIcon,
    },
  ];

  return (
    <div>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 display-none"
        aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {items.map((item) => (
              <NavigationItem key={item.id} {...item} />
            ))}
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">{children}</div>
    </div>
  );
}
