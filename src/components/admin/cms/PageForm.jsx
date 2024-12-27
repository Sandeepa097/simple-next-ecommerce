'use client';

import { useState } from 'react';
import Card from '../../base/Card';
import TextInput from '../../base/TextInput';
import SubmitButton from '../../base/SubmitButton';

export default function PageForm({ onSubmit, initialData = {} }) {
  const [title, setTitle] = useState(initialData.title || '');
  const [bodySummary, setBodySummary] = useState(initialData.bodySummary || '');
  const [body, setBody] = useState(initialData.body || '');
  const [seoTitle, setSeoTitle] = useState(initialData.seo?.title || '');
  const [seoDescription, setSeoDescription] = useState(
    initialData.seo?.description || ''
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, bodySummary, body, seoTitle, seoDescription });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Card
        title="New Page"
        description="Create a new page"
        subTitle="Page Details"
        subDescription="Please fill out all the fields.">
        <TextInput
          label="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the page title"
        />
        <TextInput
          label="Body Summary"
          name="bodySummary"
          value={bodySummary}
          isTextarea
          onChange={(e) => setBodySummary(e.target.value)}
          placeholder="Enter a summary of the body"
        />
        <TextInput
          label="Body"
          name="body"
          value={body}
          isTextarea
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter the body content"
        />
        <TextInput
          label="SEO Title"
          name="seoTitle"
          value={seoTitle}
          onChange={(e) => setSeoTitle(e.target.value)}
          placeholder="Enter the SEO title"
        />
        <TextInput
          label="SEO Description"
          name="seoDescription"
          value={seoDescription}
          isTextarea
          onChange={(e) => setSeoDescription(e.target.value)}
          placeholder="Enter the SEO description"
        />
        <SubmitButton text={initialData?.id ? 'Update' : 'Create'} />
      </Card>
    </form>
  );
}
