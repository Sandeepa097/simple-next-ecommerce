import { useEffect, useState } from 'react';

export default function NavigationItem({ Icon, url, title }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const currentUrl = window.location.href;
    const baseUrl = window.location.origin;
    const check = currentUrl.split(baseUrl + url);
    if (check.length === 2 && url.indexOf('products/new') === -1) {
      if (url.split('/').length === 2) {
        if (check[1] === '' || !/^\/[a-zA-Z1-9]/.test(check[1])) {
          setIsActive(true);
        }
      } else {
        setIsActive(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <li>
      <a
        href={url}
        className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white ${
          isActive ? 'bg-gray' : ''
        } hover:bg-gray-100 dark:hover:bg-gray-700 group`}>
        <Icon />
        <span className="ms-3">{title}</span>
      </a>
    </li>
  );
}
