'use client';

import Image from 'next/image';
import React, { useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoIosRemove } from 'react-icons/io';
import { IoCloudUploadOutline } from 'react-icons/io5';

export default function Dropzone({
  className,
  label,
  name,
  images = [],
  multiple = false,
  onUpload,
  onRemove,
  required = false,
}) {
  const proxyInputRef = useRef(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const imageFiles = acceptedFiles.filter((file) =>
        file.type.startsWith('image/')
      );
      imageFiles.forEach((file) => {
        const url = URL.createObjectURL(file);
        onUpload(file, url);
      });

      if (imageFiles.length !== acceptedFiles.length) {
        alert('Only image files are allowed!');
      }
    },
    [onUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple,
  });

  return (
    <div {...getRootProps()} className={`md:col-span-5 ${className}`}>
      <label htmlFor={name} className="font-medium block py-2">
        {label}
      </label>
      <div className="border p-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-100">
        <input
          ref={proxyInputRef}
          style={{
            opacity: 0,
            height: '1px',
            display: 'block',
          }}
          type="text"
          name={name + 'Proxy'}
          value={images && images.length ? 'Proxy fill' : ''}
          onChange={() => {}}
          onInvalid={(e) => e.target.setCustomValidity('Please select a file.')}
          required={required}
        />
        <input
          name={name}
          id={name}
          {...getInputProps({
            onChange: () => {
              if (proxyInputRef.current) {
                proxyInputRef.current.setCustomValidity('');
              }
            },
          })}
        />
        <div className="flex justify-center items-center flex-wrap min-h-20 gap-2">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={image.url}
                alt={image.name}
                width={80}
                height={80}
                className={`h-20 w-20 object-cover rounded border-2 ${
                  image.uploading ? 'opacity-50' : ''
                }`}
              />
              {!image.uploading && (
                <div
                  className="absolute top-0 right-0 border-2 border-white rounded-full bg-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(image);
                  }}>
                  <IoIosRemove className="text-white text-xl hover:text-2xl" />
                </div>
              )}
            </div>
          ))}
          {(!images || images.length === 0) && (
            <IoCloudUploadOutline className="text-4xl text-gray-300" />
          )}
        </div>
        <p style={{ color: '#9ca3af' }}>
          {multiple
            ? 'Drop images here or click to upload'
            : 'Drop image here or click to upload'}
        </p>
      </div>
    </div>
  );
}
