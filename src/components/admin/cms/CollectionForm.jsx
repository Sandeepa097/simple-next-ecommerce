'use client';

import { useState } from 'react';
import Card from '../../base/Card';
import TextInput from '../../base/TextInput';
import SubmitButton from '../../base/SubmitButton';

export default function CollectionForm({ onSubmit, initialData = {} }) {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [seoTitle, setSeoTitle] = useState(initialData.seo?.title || '');
  const [seoDescription, setSeoDescription] = useState(
    initialData.seo?.description || ''
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, seoTitle, seoDescription });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card title="New Collection" description="Create a new collection">
        <TextInput
          label="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the collection title"
          maxLength={255}
          required={true}
        />
        <TextInput
          label="Description"
          name="description"
          value={description}
          isTextarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter the collection description"
          required={true}
        />
        <TextInput
          label="SEO Title"
          name="seoTitle"
          value={seoTitle}
          onChange={(e) => setSeoTitle(e.target.value)}
          placeholder="Enter the SEO title"
          maxLength={255}
          required={true}
        />
        <TextInput
          label="SEO Description"
          name="seoDescription"
          value={seoDescription}
          isTextarea
          onChange={(e) => setSeoDescription(e.target.value)}
          placeholder="Enter the SEO description"
          required={true}
        />
        <SubmitButton text={initialData?.id ? 'Update' : 'Create'} />
      </Card>
    </form>
  );
}
