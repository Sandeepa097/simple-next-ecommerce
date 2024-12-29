'use client';

import Image from 'next/image';
import AttributeMenuIcon from '../../icons/AttributeMenuIcon';
import CollectionMenuIcon from '../../icons/CollectionMenuIcon';
import PageMenuIcon from '../../icons/PageMenuIcon';
import ProductMenuIcon from '../../icons/ProductMenuIcon';
import SettingMenuIcon from '../../icons/SettingMenuIcon';
import LogoutButton from './LogoutButton';
import NavigationItem from './NavigationItem';

export default function NavigationMenu({ children }) {
  const appName = process.env.NEXT_PUBLIC_APP_NAME;

  const items = [
    {
      id: 1,
      title: 'Products',
      Icon: ProductMenuIcon,
      url: '/admin/products',
    },
    {
      id: 2,
      title: 'Collections',
      Icon: CollectionMenuIcon,
      url: '/admin/collections',
    },
    {
      id: 3,
      title: 'Attributes',
      Icon: AttributeMenuIcon,
      url: '/admin/attributes',
    },
    {
      id: 4,
      title: 'Pages',
      Icon: PageMenuIcon,
      url: '/admin/pages',
    },
    {
      id: 5,
      title: 'Settings',
      Icon: SettingMenuIcon,
      url: '/admin/settings',
    },
  ];

  return (
    <div>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 display-none"
        aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className="flex justify-start pb-6 px-2 items-center">
            <Image src="/favicon.ico" alt="App logo" width={32} height={32} />
            <p className="ms-3 font-large text-white">{appName}</p>
          </div>
          <ul className="space-y-2 font-medium">
            {items.map((item) => (
              <NavigationItem key={item.id} {...item} />
            ))}
            <LogoutButton />
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">{children}</div>
    </div>
  );
}
