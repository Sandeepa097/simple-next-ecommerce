'use client';

import { useState, useEffect } from 'react';
import AttributeSelector from './AttributeSelector';
import ProductVariantForm from './ProductVariantForm';

export default function ProductForm() {
  const [collections, setCollections] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionHtml, setDescriptionHtml] = useState('');
  const [collectionId, setCollectionId] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [images, setImages] = useState([]);
  const [availableForSale, setAvailableForSale] = useState(true);
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
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
        title,
        description,
        descriptionHtml,
        collectionId,
        featuredImage,
        images,
        availableForSale,
        seoTitle,
        seoDescription,
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
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
        <label className="block text-sm font-medium">Description HTML</label>
        <textarea
          value={descriptionHtml}
          onChange={(e) => setDescriptionHtml(e.target.value)}
          className="w-full mt-1 border rounded p-2"
          rows="4"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Collection</label>
        <select
          value={collectionId}
          onChange={(e) => setCollectionId(e.target.value)}
          className="w-full mt-1 border rounded p-2"
          required>
          {collections.map((collection) => (
            <option key={collection.id} value={collection.id}>
              {collection.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Featured Image</label>
        <input
          type="file"
          onChange={(e) => handleFileUpload(e, setFeaturedImage)}
          className="w-full mt-1 border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Additional Images</label>
        <input
          type="file"
          onChange={(e) => handleFileUpload(e, imagesSetter, true)}
          className="w-full mt-1 border rounded p-2"
          multiple
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Available For Sale</label>
        <input
          type="checkbox"
          value={availableForSale}
          checked={availableForSale}
          onChange={(e) => setAvailableForSale(e.target.checked)}
          className="mt-1"
        />
      </div>

      <div>
        <div>SEO</div>
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            className="w-full p-2 border rounded"></textarea>
        </div>
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
        className="w-full px-4 py-2 bg-blue-500 text-white rounded">
        Save Product
      </button>
    </form>
  );
}
