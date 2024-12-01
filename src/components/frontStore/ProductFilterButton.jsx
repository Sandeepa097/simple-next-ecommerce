export default function ProductFilterButton({ title, Icon }) {
  return (
    <button
      data-modal-toggle="filterModal"
      data-modal-target="filterModal"
      type="button"
      className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 sm:w-auto">
      <Icon />
      {title}
      <svg
        className="-me-0.5 ms-2 h-4 w-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m19 9-7 7-7-7"
        />
      </svg>
    </button>
  );
}
