'use client';

import { useState } from 'react';

export default function CategoryForm({ onSubmit, initialData = {} }) {
  const [name, setName] = useState(initialData.name || '');
  const [image, setImage] = useState(initialData.name || '');
  const [description, setDescription] = useState(initialData.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, image });
  };

  const handleFileUpload = async (e, setter) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    const response = await fetch('/api/admin/files/temp', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      setImage(data.name);
    } else {
      alert('Failed to upload file');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Image</label>
        <input
          type="file"
          onChange={(e) => handleFileUpload(e, setImage)}
          className="w-full mt-1 border rounded p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded">
        Save
      </button>
    </form>
  );
}
