'use client';

import { useState, useEffect } from 'react';
import AttributeSelector from './AttributeSelector';
import ProductVariantForm from './ProductVariantForm';

export default function ProductForm() {
  const [categories, setCategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [image, setImage] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [variants, setVariants] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description,
        categoryId,
        coverPhoto,
        image,
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

  async function fetchCategories() {
    const res = await fetch('/api/admin/categories', {
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
    const setCategoriesAndAttributes = async () => {
      const categoriesList = await fetchCategories();
      const attributesList = await fetchAttributes();

      setCategories(categoriesList);
      setAttributes(attributesList);
    };

    setCategoriesAndAttributes();
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
        <label className="block text-sm font-medium">Category</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full mt-1 border rounded p-2"
          required>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Cover Photo</label>
        <input
          type="file"
          onChange={(e) => handleFileUpload(e, setCoverPhoto)}
          className="w-full mt-1 border rounded p-2"
          required
        />
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
