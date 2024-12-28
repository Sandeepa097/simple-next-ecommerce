import Listing from '../../../components/base/Listing';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import Paginator from '../../../components/base/Paginator';

async function ProductList({ searchParams }) {
  try {
    const query = searchParams?.query || '';
    const limit = Number(searchParams?.limit || 10);
    const offset = Number(searchParams?.offset || 0);

    const cookieHeader = (await cookies()).toString();
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_ORIGIN
      }/api/admin/products?limit=${limit}&offset=${offset}${
        query ? `&search=${query}` : ''
      }`,
      {
        method: 'GET',
        headers: {
          Cookie: cookieHeader,
        },
      }
    );

    const resolvedResponse = await response.json();

    const products = resolvedResponse.products?.map((product) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      image: {
        url: `/api/files/products/${product.featuredImageUrl}`,
        altText: product.featuredImageAltText,
        width: product.featuredImageWidth,
        height: product.featuredImageHeight,
      },
      editButton: {
        text: 'Edit',
        href: `/admin/products/edit?key=${product.id}`,
      },
    }));

    return (
      <div>
        <Listing
          items={products}
          search={true}
          initialSearch={query}
          path={'/admin/products'}
          headerTitle="Products"
          emptyMessage="No products found"
          newButton={{ href: '/admin/products/new', text: 'New Product' }}
          deleteUrl={`${process.env.NEXT_PUBLIC_ORIGIN}/api/admin/products`}
        />
        <Paginator
          path={'/admin/products'}
          currentPage={offset / limit + 1}
          totalPages={Math.ceil(resolvedResponse.count / limit)}
          limit={limit}
        />
      </div>
    );
  } catch (error) {
    console.error(error);
  }
}

export default async function Page({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  return (
    <Suspense>
      <div>
        <ProductList searchParams={resolvedSearchParams} />
      </div>
    </Suspense>
  );
}
