import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NavigationItem({ Icon, url, title }) {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const pathMatched = pathname.startsWith(url);
    if (pathMatched) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <li>
      <a
        href={url}
        className={`flex items-center p-2 rounded-lg text-white ${
          isActive ? 'bg-gray-700' : ''
        } hover:bg-gray-700 group`}>
        <Icon />
        <span className="ms-3">{title}</span>
      </a>
    </li>
  );
}
