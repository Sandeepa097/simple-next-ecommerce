import React from 'react';
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaLink,
  FaListUl,
  FaListOl,
  FaFont,
} from 'react-icons/fa';

const Toolbox = ({ editor }) => {
  if (!editor) return null;

  const setLink = () => {
    const url = prompt('Enter the URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

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
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded ${
          editor.isActive('underline')
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100'
        }`}>
        <FaUnderline />
      </button>
      <button
        type="button"
        onClick={setLink}
        className="p-2 rounded bg-gray-100">
        <FaLink />
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
      <select
        onChange={(e) =>
          editor.chain().focus().setFontSize(e.target.value).run()
        }
        className="p-2 rounded bg-gray-100">
        <option value="">Font Size</option>
        <option value="12px">12px</option>
        <option value="16px">16px</option>
        <option value="20px">20px</option>
        <option value="24px">24px</option>
      </select>
      <input
        type="color"
        onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
        className="p-2 rounded bg-gray-100"
      />
    </div>
  );
};

export default Toolbox;
