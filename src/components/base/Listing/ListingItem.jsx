import Image from 'next/image';
import Link from 'next/link';

export default function ListingItem({ item, onDelete }) {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div className="flex justify-start items-center gap-4">
        {item.imageUrl ? (
          <div>
            <Image
              src={item.imageUrl}
              alt={item.imageAltText || item.title}
              className="w-20 h-20 object-cover"
            />
          </div>
        ) : (
          <></>
        )}
        <div>
          <h3 className="font-bold">{item.title}</h3>
          <p className="text-gray-600">{item.description}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        {item.editButton ? (
          <Link href={item.editButton.href}>
            <span>
              {' '}
              <button
                href={item.editButton.href}
                className="px-4 py-2 bg-blue-500 text-white rounded">
                {item.editButton.text || 'Edit'}
              </button>
            </span>
          </Link>
        ) : (
          <></>
        )}
        <button
          onClick={() => onDelete(item.id)}
          className="px-4 py-2 bg-red-500 text-white rounded">
          Delete
        </button>
      </div>
    </div>
  );
}
