'use client';

import { useState, useEffect } from 'react';
import AttributeSelector from './AttributeSelector';
import ProductVariantForm from './ProductVariantForm';
import Card from '../../base/Card';
import TextInput from '../../base/TextInput';
import SubmitButton from '../../base/SubmitButton';
import CheckBox from '../../base/CheckBox';
import Dropdown from '../../base/Dropdown';
import RichTextEditor from '../../base/RichTextEditor';

export default function ProductForm({ onSubmit, initialData = {} }) {
  const [collections, setCollections] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [descriptionHtml, setDescriptionHtml] = useState(
    initialData.descriptionHtml || ''
  );
  const [collectionId, setCollectionId] = useState(
    initialData.collectionId || ''
  );
  const [featuredImage, setFeaturedImage] = useState(
    initialData.featuredImageUrl || ''
  );
  const [images, setImages] = useState([]);
  const [availableForSale, setAvailableForSale] = useState(
    initialData.availableForSale ||
      (initialData.availableForSale !== false && true)
  );
  const [seoTitle, setSeoTitle] = useState(initialData.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(
    initialData.seoDescription || ''
  );
  const [selectedAttributes, setSelectedAttributes] = useState(
    initialData.options && initialData.options.length
      ? initialData.options.map((option) => option.attributeId)
      : []
  );
  const [variants, setVariants] = useState([]);

  const imagesSetter = (file) => {
    setImages([...images, file]);
  };

  const setInitialImages = (data) => {
    setImages(
      data.images && data.images.length
        ? data.images.map((image) => image.url)
        : []
    );
  };

  const setInitialSelectedAttributes = (data) => {
    setSelectedAttributes(
      data.options && data.options.length
        ? data.options.map((option) => option.attributeId)
        : []
    );
  };

  const setInitialVariants = (data) => {
    setVariants(
      data.variants && data.variants.length
        ? data.variants.map((variant) => ({
            title: variant.title,
            currencyCode: variant.price?.currencyCode || '',
            price: variant.price?.amount || '',
            availableForSale: variant.availableForSale,
            ...variant.selectedOptions.reduce(
              (accumulator, option) => ({
                ...accumulator,
                [option.attributeId]: option.value,
              }),
              {}
            ),
          }))
        : []
    );
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
    onSubmit({
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
    });
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

  useEffect(() => {
    if (!initialData.id) return;
    setInitialImages(initialData);
    setInitialSelectedAttributes(initialData);
    setInitialVariants(initialData);
  }, [initialData]);

  return (
    <form onSubmit={handleSubmit}>
      <Card
        title="New Product"
        description="Create a new product"
        subTitle="Product Details"
        subDescription="Please fill out all the fields.">
        <TextInput
          label="Title"
          name="title"
          placeholder="Enter the product title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextInput
          label="Description"
          name="description"
          placeholder="Enter the product description"
          value={description}
          isTextarea
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* <TextInput
          label="Description HTML"
          name="descriptionHtml"
          placeholder="Enter the product description HTML"
          value={descriptionHtml}
          isTextarea
          onChange={(e) => setDescriptionHtml(e.target.value)}
        /> */}

        <RichTextEditor
          label="Description HTML"
          name="descriptionHtml"
          placeholder="Enter the product description HTML"
          value={descriptionHtml}
          isTextarea
          onChange={(e) => setDescriptionHtml(e.target.value)}
        />

        <CheckBox
          label="Available for Sale"
          name="availableForSale"
          description="At least one variant from the product is available for sale"
          checked={availableForSale}
          onChange={(e) => setAvailableForSale(e.target.checked)}
        />

        <Dropdown
          label="Collection"
          name="collectionId"
          items={collections.map((collection) => ({
            id: collection.id,
            value: collection.id,
            text: collection.title,
          }))}
          placeholder="Select a collection (optional)"
          value={collectionId}
          onChange={(value) => setCollectionId(value)}
        />

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

        <TextInput
          label="SEO Title"
          name="seoTitle"
          placeholder="Enter the SEO title"
          value={seoTitle}
          onChange={(e) => setSeoTitle(e.target.value)}
        />

        <TextInput
          label="SEO Description"
          name="seoDescription"
          placeholder="Enter the SEO description"
          value={seoDescription}
          isTextarea
          onChange={(e) => setSeoDescription(e.target.value)}
        />

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

        <SubmitButton text={initialData?.id ? 'Update' : 'Create'} />
      </Card>
    </form>
  );
}
