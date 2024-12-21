'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import ProductListingNavBar from '../../../components/frontStore/ProductListingNavBar';

export default function Page() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [productVariants, setProductVariants] = useState({});

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [params]);

  useEffect(() => {
    if (product) {
      setProductVariants(extractVariants(product));
    }
  }, [product]);

  const extractVariants = (product) => {
    let extracted = {};

    product.productVariants.forEach((variant) =>
      variant.productVariantAttributeValues.forEach((variantAttribute) => {
        extracted[variantAttribute.attributeId] = {
          id: variantAttribute.attributeId,
          name: variantAttribute.attribute.name,
          values: [
            ...new Set([
              ...(extracted[variantAttribute.attributeId]?.values || []),
              variantAttribute.value,
            ]),
          ],
          selected:
            extracted[variantAttribute.attributeId]?.selected ||
            variantAttribute.value,
        };
      })
    );

    return extracted;
  };

  return (
    <div>
      <section className="py-2 antialiased bg-gray-50">
        {product && product !== null && (
          <div className="mx-auto py-4 max-w-screen-xl px-4 2xl:px-0">
            <ProductListingNavBar
              order={[
                {
                  title: product.category.name,
                  href: `/${product.category.urlKey}`,
                },
                { title: product.name },
              ]}
            />
            <div className="mt-4 mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8 gap-8">
              <div>Image</div>
              <div className="flex-1">
                <div>Price</div>
                <div>{product.name}</div>
                <div>SKU</div>
                {Object.values(productVariants).map((variant) => (
                  <div key={variant.id}>
                    <div>
                      {variant.name}: {variant.selected}
                    </div>
                    {variant.values.map((value) => (
                      <div key={`${variant.id}-${value}`}>{value}</div>
                    ))}
                  </div>
                ))}
                <div>Quantity</div>
                <div>Buy now</div>
              </div>
            </div>
            <div>Description</div>
          </div>
        )}
      </section>
    </div>
  );
}
