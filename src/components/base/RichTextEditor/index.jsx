'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Toolbox from './Toolbox';

export default function Index({
  className,
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  const editor = useEditor({
    extensions: [StarterKit, Bold, Italic, Heading, BulletList, OrderedList],
    content: value || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange({ target: { name, value: html } });
    },
    editorProps: {
      attributes: {
        class: 'border p-3 rounded min-h-[150px] focus:outline-none',
        placeholder: placeholder || '',
      },
    },
  });

  if (!editor) return null;

  return (
    <div className={`rich-text-editor md:col-span-5 ${className}`}>
      {label && <label className="block mb-2 font-medium">{label}</label>}
      <Toolbox editor={editor} />
      <div className="editor-container mt-1 rounded w-full bg-gray-50 hover:bg-gray-100 min-h-20">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
