'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Toolbox from './Toolbox';
import ReactShadowRoot from 'react-shadow';

export default function Index({
  className,
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Bold,
      Italic,
      Underline,
      Link,
      TextStyle,
      BulletList,
      OrderedList,
      ListItem,
    ],
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
        <ReactShadowRoot.div>
          <style>
            {`
          .tiptap {
            min-height: 80px;
            padding: 0.5rem 1rem;
          }
          p {
            padding: 0;
            line-height: 1.5;
          }
        `}
          </style>
          <EditorContent editor={editor} />
        </ReactShadowRoot.div>
      </div>
    </div>
  );
}
