import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Dropzone({
  className,
  label,
  name,
  images = [],
  multiple = false,
  onUpload,
}) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const url = URL.createObjectURL(file);
        onUpload(file, url);
      });
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
        <input name={name} id={name} {...getInputProps()} />
        <div className="flex justify-center items-center flex-wrap">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={image.name}
              className="h-20 w-20 object-cover rounded"
            />
          ))}
        </div>
        <p style={{ color: '#9ca3af' }}>
          Drag and drop image files here, or click to select files.
        </p>
      </div>
    </div>
  );
}
