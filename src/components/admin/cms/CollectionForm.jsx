'use client';

import { useState } from 'react';

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"></textarea>
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
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded">
        Save
      </button>
    </form>
  );
}
