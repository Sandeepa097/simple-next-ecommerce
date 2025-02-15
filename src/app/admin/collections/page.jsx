import Listing from '../../../components/base/Listing';
import { Suspense } from 'react';
import { cookies } from 'next/headers';

async function CollectionList() {
  try {
    const cookieHeader = (await cookies()).toString();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ORIGIN}/api/admin/collections`,
      {
        method: 'GET',
        headers: {
          Cookie: cookieHeader,
        },
      }
    );

    const collections = (await response.json()).map((collection) => ({
      id: collection.id,
      title: collection.title,
      description: collection.description,
      editButton: {
        text: 'Edit',
        href: `/admin/collections/edit?key=${collection.id}`,
      },
    }));

    return (
      <Listing
        items={collections}
        headerTitle="Collections"
        emptyMessage="No collections found"
        newButton={{ href: '/admin/collections/new', text: 'New Collection' }}
        actionUrl={`${process.env.NEXT_PUBLIC_ORIGIN}/api/admin/collections`}
      />
    );
  } catch (error) {
    console.error(error);
  }
}

export default function Page() {
  return (
    <Suspense>
      <div>
        <CollectionList />
      </div>
    </Suspense>
  );
}
