import Listing from '../../../components/base/Listing';
import { Suspense } from 'react';
import { cookies } from 'next/headers';

async function ProductList() {
  try {
    const cookieHeader = await cookies().toString();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ORIGIN}/api/admin/products`,
      {
        method: 'GET',
        headers: {
          Cookie: cookieHeader,
        },
      }
    );

    const products = (await response.json()).map((product) => ({
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
      <Listing
        items={products}
        headerTitle="Products"
        emptyMessage="No products found"
        newButton={{ href: '/admin/products/new', text: 'New Product' }}
        deleteUrl={`${process.env.NEXT_PUBLIC_ORIGIN}/api/admin/products`}
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
        <ProductList />
      </div>
    </Suspense>
  );
}
