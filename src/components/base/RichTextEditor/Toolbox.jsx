import React from 'react';
import {
  FaBold,
  FaItalic,
  FaHeading,
  FaListUl,
  FaListOl,
} from 'react-icons/fa';

export default function Toolbox({ editor }) {
  if (!editor) return null;

  return (
    <div className="flex space-x-2 mb-3">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded ${
          editor.isActive('bold') ? 'bg-blue-500 text-white' : 'bg-gray-100'
        }`}>
        <FaBold />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded ${
          editor.isActive('italic') ? 'bg-blue-500 text-white' : 'bg-gray-100'
        }`}>
        <FaItalic />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded ${
          editor.isActive('heading', { level: 1 })
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100'
        }`}>
        <FaHeading />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded ${
          editor.isActive('bulletList')
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100'
        }`}>
        <FaListUl />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded ${
          editor.isActive('orderedList')
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100'
        }`}>
        <FaListOl />
      </button>
    </div>
  );
}
