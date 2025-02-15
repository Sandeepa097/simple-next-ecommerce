import Listing from '../../../components/base/Listing';
import { Suspense } from 'react';
import { cookies } from 'next/headers';

async function PageList() {
  try {
    const cookieHeader = (await cookies()).toString();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ORIGIN}/api/admin/pages`,
      {
        method: 'GET',
        headers: {
          Cookie: cookieHeader,
        },
      }
    );

    const pages = (await response.json()).map((page) => ({
      id: page.id,
      title: page.title,
      description: page.bodySummary,
      editButton: {
        text: 'Edit',
        href: `/admin/pages/edit?key=${page.id}`,
      },
    }));

    return (
      <Listing
        items={pages}
        headerTitle="Pages"
        emptyMessage="No pages found"
        newButton={{ href: '/admin/pages/new', text: 'New Page' }}
        actionUrl={`${process.env.NEXT_PUBLIC_ORIGIN}/api/admin/pages`}
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
        <PageList />
      </div>
    </Suspense>
  );
}
