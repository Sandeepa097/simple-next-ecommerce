import Listing from '../../../components/base/Listing';
import { Suspense } from 'react';
import { cookies } from 'next/headers';

async function AttributeList() {
  try {
    const cookieHeader = (await cookies()).toString();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ORIGIN}/api/admin/attributes`,
      {
        method: 'GET',
        headers: {
          Cookie: cookieHeader,
        },
      }
    );

    const attributes = (await response.json()).map((attribute) => ({
      id: attribute.id,
      title: attribute.name,
      editButton: {
        text: 'Edit',
        href: `/admin/attributes/edit?key=${attribute.id}`,
      },
    }));

    return (
      <Listing
        items={attributes}
        headerTitle="Attributes"
        emptyMessage="No attributes found"
        newButton={{ href: '/admin/attributes/new', text: 'New Attribute' }}
        deleteUrl={`${process.env.NEXT_PUBLIC_ORIGIN}/api/admin/attributes`}
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
        <AttributeList />
      </div>
    </Suspense>
  );
}
