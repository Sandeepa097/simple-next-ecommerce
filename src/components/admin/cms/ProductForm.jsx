'use client';

import { useState, useEffect } from 'react';
import AttributeSelector from './AttributeSelector';
import ProductVariantForm from './ProductVariantForm';

export default function ProductForm() {
  const [collections, setCollections] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [name, setName] = useState('');
  const [urlKey, setUrlKey] = useState('');
  const [description, setDescription] = useState('');
  const [collectionKey, setCollectionKey] = useState('');
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [variants, setVariants] = useState([]);

  const imagesSetter = (file) => {
    setImages([...images, file]);
  };

  const handleFileUpload = async (e, setter, multiple = false) => {
    if (multiple) {
      Array.from(e.target.files).forEach((file) => {
        handleFileUpload(
          {
            ...e,
            target: {
              ...e.target,
              files: [file],
            },
          },
          setter
        );
      });
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        urlKey,
        description,
        collectionKey,
        image,
        images,
        selectedAttributes,
        variants,
      }),
    });

    if (response.ok) {
      alert('Product created successfully');
    } else {
      alert('Failed to create product');
    }
  };

  async function fetchCollections() {
    const res = await fetch('/api/admin/collections', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }

    return [];
  }

  async function fetchAttributes() {
    const res = await fetch('/api/admin/attributes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }

    return [];
  }

  useEffect(() => {
    const setCollectionsAndAttributes = async () => {
      const collectionsList = await fetchCollections();
      const attributesList = await fetchAttributes();

      setCollections(collectionsList);
      setAttributes(attributesList);
    };

    setCollectionsAndAttributes();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-1 border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">URL Key</label>
        <input
          type="text"
          value={urlKey}
          onChange={(e) => setUrlKey(e.target.value)}
          className="w-full mt-1 border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mt-1 border rounded p-2"
          rows="4"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Collection</label>
        <select
          value={collectionKey}
          onChange={(e) => setCollectionKey(e.target.value)}
          className="w-full mt-1 border rounded p-2"
          required>
          {collections.map((collection) => (
            <option key={collection.id} value={collection.urlKey}>
              {collection.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Product Image</label>
        <input
          type="file"
          onChange={(e) => handleFileUpload(e, setImage)}
          className="w-full mt-1 border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Addition/Variant Images
        </label>
        <input
          type="file"
          onChange={(e) => handleFileUpload(e, imagesSetter, true)}
          className="w-full mt-1 border rounded p-2"
          multiple
        />
      </div>

      {/* Attribute Selector */}
      <AttributeSelector
        attributes={attributes}
        selectedAttributes={selectedAttributes}
        setSelectedAttributes={setSelectedAttributes}
      />

      {/* Variant Creator */}
      <ProductVariantForm
        selectedAttributes={attributes.filter((attribute) =>
          selectedAttributes.includes(attribute.id)
        )}
        variantImages={images}
        variants={variants}
        setVariants={setVariants}
      />

      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-500 text-white rounded">
        Save Product
      </button>
    </form>
  );
}
