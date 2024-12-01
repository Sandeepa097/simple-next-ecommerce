import HomeIcon from '../icons/HomeIcon';
import RightIcon from '../icons/RightIcon';

function LinkedItem({ href, title, Icon }) {
  return (
    <li>
      <div className="flex items-center">
        <Icon />
        <a
          href={href}
          className="ms-1 text-sm font-medium text-gray-900 hover:text-gray-400 md:ms-2">
          {title}
        </a>
      </div>
    </li>
  );
}

function UnlinkedItem({ title, Icon }) {
  return (
    <li aria-current="page">
      <div className="flex items-center">
        <Icon />
        <span className="ms-1 text-sm font-medium text-gray-900 md:ms-2">
          {title}
        </span>
      </div>
    </li>
  );
}

export default function ProductListingNavBar({ order = [] }) {
  return (
    <div>
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          {order.length ? (
            <LinkedItem title="Home" href="#" Icon={HomeIcon} />
          ) : (
            <UnlinkedItem title="Home" Icon={HomeIcon} />
          )}
          {order.map((item, index) =>
            index === order.length - 1 ? (
              <UnlinkedItem key={index} title={item.title} Icon={RightIcon} />
            ) : (
              <LinkedItem
                key={index}
                title={item.title}
                href={item.href}
                Icon={RightIcon}
              />
            )
          )}
        </ol>
      </nav>
    </div>
  );
}
