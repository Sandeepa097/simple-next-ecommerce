'use client';

import { useEffect, useState } from 'react';
import AttributeListItem from './AttributeListItem';

export default function AttributeListing() {
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    fetch('/api/admin/attributes')
      .then((res) => res.json())
      .then((data) => setAttributes(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/admin/attributes/${id}`, { method: 'DELETE' });
    setAttributes(attributes.filter((attribute) => attribute.id !== id));
  };

  const handleEdit = (attribute) => {
    window.location.href = `/admin/attributes/edit?key=${attribute.id}`;
  };

  return (
    <div>
      {(!attributes || !attributes.length) && <span>No attributes</span>}
      {attributes.map((attribute) => (
        <AttributeListItem
          key={attribute.id}
          attribute={attribute}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
