'use client';

import { useState } from 'react';
import { GoSearch } from 'react-icons/go';

export default function ListingSearch({ path, initialSearch }) {
  const [query, setQuery] = useState(initialSearch || '');
  const handleSearch = () => {
    const queryString = query ? `?query=${query}` : '';
    const url = `${path}${queryString}`;

    window.location.href = url;
  };

  return (
    <div className="mt-4 mr-2 flex">
      <button
        type="button"
        className="mt-1 inline-flex items-center px-3 text-sm text-gray-900 rounded-e-0 rounded-s-md bg-gray-200"
        onClick={(e) => handleSearch()}>
        <GoSearch />
      </button>
      <input
        type="text"
        className="h-10 border mt-1 px-4 w-full bg-gray-50 rounded-r-none rounded-l-none border-r-0"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <button
        type="button"
        className="mt-1 inline-flex items-center px-3 text-sm text-gray-900 rounded-l-none rounded-r-md bg-gray-50 border border-l-0 hover:bg-gray-200"
        onClick={(e) => handleSearch()}>
        <GoSearch />
      </button>
    </div>
  );
}
