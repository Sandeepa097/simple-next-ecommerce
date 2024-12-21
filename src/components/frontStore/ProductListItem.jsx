export default function ProductListItem({ product }) {
  return (
    <div className="rounded-lg border border-gray-400 bg-white p-6 shadow-sm">
      <div className="h-28 w-full">
        <a href={`/products/${product.urlKey}`}>
          <img
            className="mx-auto h-full"
            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
            alt=""
          />
        </a>
      </div>
      <div className="pt-6">
        <div className="mb-4 flex items-center justify-end gap-4">
          <div className="flex items-center justify-end gap-1">
            <button
              type="button"
              data-tooltip-target="tooltip-quick-look"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only"> Quick look </span>
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                />
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </button>
            <div
              id="tooltip-quick-look"
              role="tooltip"
              className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
              data-popper-placement="top">
              Quick look
              <div className="tooltip-arrow" data-popper-arrow=""></div>
            </div>
          </div>
        </div>

        <a
          href={`/products/${product.urlKey}`}
          className="text-lg font-semibold leading-tight text-gray-900 hover:underline">
          {product.name}
        </a>

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-2xl font-extrabold leading-tight text-gray-900">
            $1,699
          </p>

          <button
            type="button"
            className="inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-medium border border-gray-200 bg-white text-gray-900">
            <svg
              className="-ms-2 me-2 h-5 w-5"
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
                d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
              />
            </svg>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
