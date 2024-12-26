export default function ProductVariantForm({
  selectedAttributes,
  variantImages,
  variants,
  setVariants,
}) {
  const handleAddVariant = () => {
    const newVariant = {};
    selectedAttributes.forEach((attr) => {
      newVariant[attr.id] = '';
    });
    newVariant.title = '';
    newVariant.currencyCode = 'LKR';
    newVariant.price = '';
    newVariant.availableForSale = true;
    setVariants([...variants, newVariant]);
  };

  const handleVariantChange = (index, key, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][key] = value;
    setVariants(updatedVariants);
  };

  return (
    <div>
      <h3 className="text-lg font-medium mt-4">Product Variants</h3>
      {variants.map((variant, index) => (
        <div key={index} className="space-y-2 border p-4 rounded mt-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              value={variant.title}
              onChange={(e) =>
                handleVariantChange(index, 'title', e.target.value)
              }
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Currency Code</label>
            <input
              type="text"
              value={variant.currencyCode}
              onChange={(e) =>
                handleVariantChange(index, 'currencyCode', e.target.value)
              }
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              step="0.01"
              value={variant.price}
              onChange={(e) =>
                handleVariantChange(index, 'price', e.target.value)
              }
              className="w-full mt-1 border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Available For Sale
            </label>
            <input
              type="checkbox"
              checked={variant.availableForSale}
              onChange={(e) =>
                handleVariantChange(index, 'availableForSale', e.target.checked)
              }
              className="mt-1"
            />
          </div>

          {selectedAttributes.map((attr) => (
            <div key={attr.id}>
              <label className="block text-sm font-medium">{attr.name}</label>
              <input
                type="text"
                value={variant[attr.id]}
                onChange={(e) =>
                  handleVariantChange(index, attr.id, e.target.value)
                }
                className="w-full mt-1 border rounded p-2"
              />
            </div>
          ))}
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddVariant}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
        Add Variant
      </button>
    </div>
  );
}
