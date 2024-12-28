'use client';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Paginator({ currentPage, totalPages, limit, path }) {
  const handleNavigation = (page) => {
    const offset = (page - 1) * limit;
    const url = `${path}?offset=${offset}&limit=${limit}`;

    window.location.href = url;
  };

  return (
    <div className="mt-4 flex items-center justify-end py-2">
      <div className="flex items-center bg-gray-100 border border-gray-300 rounded-md shadow-sm px-3 py-1 space-x-4">
        <button
          type="button"
          className={`flex items-center px-2 py-1 rounded text-xs font-medium transition 
            ${
              currentPage <= 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:text-gray-900'
            }`}
          disabled={currentPage <= 1}
          onClick={() => handleNavigation(currentPage - 1)}>
          <FaChevronLeft className="mr-1" />
          Prev
        </button>

        {/* Page Indicator */}
        <span className="text-xs font-medium text-gray-600">
          Page <span className="font-semibold">{currentPage}</span> of{' '}
          {totalPages}
        </span>
        <button
          type="button"
          className={`flex items-center px-2 py-1 rounded text-xs font-medium transition 
            ${
              currentPage >= totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:text-gray-900'
            }`}
          disabled={currentPage >= totalPages}
          onClick={() => handleNavigation(currentPage + 1)}>
          Next
          <FaChevronRight className="ml-1" />
        </button>
      </div>
    </div>
  );
}
