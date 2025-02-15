import Image from 'next/image';
import Link from 'next/link';
import HeartOutlined from '../../icons/HeartOutlined';
import HeartFilled from '../../icons/HeartFilled';

export default function ListingItem({ item, onDelete, onChangeFavorite }) {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div className="flex justify-start items-center gap-4">
        {item.favoriteButton ? (
          <button
            type="button"
            onClick={() => onChangeFavorite(item.id, !item.isFavorite)}
            className="px-1">
            {item.isFavorite ? <HeartFilled /> : <HeartOutlined />}
          </button>
        ) : (
          <></>
        )}
        {item.image ? (
          <div>
            <Image
              src={item.image.url}
              alt={item.image.altText || item.title}
              width={item.width || 80}
              height={item.height || 80}
              className="w-20 h-20 object-cover"
            />
          </div>
        ) : (
          <></>
        )}
        <div>
          <h3 className="font-bold">{item.title}</h3>
          <p className="text-gray-600">{item.description?.split(0, 255)}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        {item.editButton ? (
          <Link href={item.editButton.href}>
            <span>
              {' '}
              <button
                type="button"
                href={item.editButton.href}
                className="px-4 py-2 bg-green-500 text-white rounded">
                {item.editButton.text || 'Edit'}
              </button>
            </span>
          </Link>
        ) : (
          <></>
        )}
        <button
          type="button"
          onClick={() => {
            const isConfirmed = confirm('Are you sure you want to delete?');
            if (isConfirmed) onDelete(item.id);
          }}
          className="px-4 py-2 bg-red-500 text-white rounded">
          Delete
        </button>
      </div>
    </div>
  );
}
