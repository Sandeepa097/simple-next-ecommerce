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
import Dropzone from '../../base/Dropzone';

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
    initialData.featuredImageUrl
      ? {
          url: `/api/files/products/${initialData.featuredImageUrl}`,
          name: initialData.featuredImageUrl,
        }
      : null
  );
  const [uploadingFeaturedImage, setUploadingFeaturedImage] = useState('');
  const [images, setImages] = useState(
    initialData.images && initialData.images.length
      ? initialData.images.map((image) => ({
          url: `/api/files/products/${image.url}`,
          name: image.url,
        }))
      : []
  );
  const [uploadingImages, setUploadingImages] = useState([]);
  const [availableForSale, setAvailableForSale] = useState(
    initialData.availableForSale ||
      (initialData.availableForSale !== false &&
        initialData.availableForSale !== 0 &&
        true)
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

  const handleFeaturedImageUpload = (file, url) => {
    setFeaturedImage(null);
    setUploadingFeaturedImage(url);
    uploadFileToServer(file).then((name) => {
      setFeaturedImage({ name, url: `/api/admin/files/temp/${name}` });
      setUploadingFeaturedImage('');
    });
  };

  const handleImageUpload = (file, url) => {
    setUploadingImages((prevUploadingImages) => [...prevUploadingImages, url]);

    uploadFileToServer(file).then((name) => {
      setImages((prevImages) => [
        ...prevImages,
        { name, url: `/api/admin/files/temp/${name}` },
      ]);

      setUploadingImages((prevUploadingImages) =>
        prevUploadingImages.filter((image) => image !== url)
      );
    });
  };

  const uploadFileToServer = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/admin/files/temp', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return data.name;
    }

    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      descriptionHtml,
      collectionId,
      featuredImage: featuredImage?.name || '',
      images: images.map((image) => image.name),
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
    setInitialSelectedAttributes(initialData);
    setInitialVariants(initialData);
  }, [initialData]);

  return (
    <form onSubmit={handleSubmit}>
      <Card title="New Product" description="Create a new product">
        <TextInput
          label="Title"
          name="title"
          placeholder="Enter the product title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={255}
          required={true}
        />

        <TextInput
          label="Comment"
          name="description"
          placeholder="Enter the product comment"
          value={description}
          isTextarea
          onChange={(e) => setDescription(e.target.value)}
          required={true}
        />

        <RichTextEditor
          label="Description"
          name="descriptionHtml"
          placeholder="Enter the product description"
          value={descriptionHtml}
          onChange={(e) => setDescriptionHtml(e.target.value)}
          required={true}
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

        <Dropzone
          label="Featured Image"
          name="featuredImage"
          images={
            featuredImage
              ? [
                  {
                    url: featuredImage.url,
                    name: 'Featured Image',
                  },
                ]
              : uploadingFeaturedImage
              ? [
                  {
                    url: uploadingFeaturedImage,
                    name: 'Uploading...',
                    uploading: true,
                  },
                ]
              : []
          }
          multiple={false}
          onUpload={handleFeaturedImageUpload}
          onRemove={(image) => setFeaturedImage(null)}
          required={true}
        />

        <Dropzone
          label="Additional Images"
          name="additionalImages"
          images={[
            ...images,
            ...uploadingImages.map((url) => ({
              url,
              name: 'Uploading...',
              uploading: true,
            })),
          ]}
          multiple={true}
          onUpload={handleImageUpload}
          onRemove={(image) =>
            setImages(images.filter((img) => img.name !== image.name))
          }
        />

        <TextInput
          label="SEO Title"
          name="seoTitle"
          placeholder="Enter the SEO title"
          value={seoTitle}
          onChange={(e) => setSeoTitle(e.target.value)}
          maxLength={255}
          required={true}
        />

        <TextInput
          label="SEO Description"
          name="seoDescription"
          placeholder="Enter the SEO description"
          value={seoDescription}
          isTextarea
          onChange={(e) => setSeoDescription(e.target.value)}
          required={true}
        />

        <AttributeSelector
          attributes={attributes}
          selectedAttributes={selectedAttributes}
          setSelectedAttributes={setSelectedAttributes}
        />

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
