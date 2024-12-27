'use client';

export default function Paginator({ currentPage, totalPages, limit, path }) {
  const handleNavigation = (page) => {
    const offset = (page - 1) * limit;
    const url = `${path}?offset=${offset}&limit=${limit}`;

    window.location.href = url;
  };

  return (
    <div className="flex justify-center space-x-2">
      <button
        className="p-2 bg-blue-500 text-white rounded"
        disabled={currentPage <= 1}
        onClick={() => handleNavigation(currentPage - 1)}>
        Previous
      </button>
      <span>
        {currentPage} of {totalPages}
      </span>
      <button
        className="p-2 bg-blue-500 text-white rounded"
        disabled={currentPage >= totalPages}
        onClick={() => handleNavigation(currentPage + 1)}>
        Next
      </button>
    </div>
  );
}
