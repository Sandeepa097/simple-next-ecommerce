export default function ProductVariantForm({
  selectedAttributes,
  variants,
  setVariants,
}) {
  const handleFileUpload = async (e, setter) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    const response = await fetch('/api/admin/files/temp', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      setter(data.name);
    } else {
      alert('Failed to upload file');
    }
  };

  const handleAddVariant = () => {
    const newVariant = {};
    selectedAttributes.forEach((attr) => {
      newVariant[attr.id] = '';
    });
    newVariant.price = '';
    newVariant.isAvailable = true;
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
            <label className="block text-sm font-medium">Variant Photo</label>
            <input
              type="file"
              onChange={(e) =>
                handleFileUpload(e, (value) => {
                  handleVariantChange(index, 'variantImage', value);
                })
              }
              className="w-full mt-1 border rounded p-2"
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
            <label className="block text-sm font-medium">In Stock</label>
            <input
              type="checkbox"
              checked={variant.isAvailable}
              onChange={(e) =>
                handleVariantChange(index, 'isAvailable', e.target.checked)
              }
              className="mt-1"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddVariant}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Add Variant
      </button>
    </div>
  );
}
