export default function CategoryListItem({ name, id }) {
  return (
    <a
      href={`/${id}`}
      className="rounded-lg border border-gray-400 bg-white p-6 shadow-sm">
      <div className="h-56">
        <img
          className="mx-auto h-full"
          src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
          alt=""
        />
      </div>
      <div className="pt-6">
        <span className="text-lg font-semibold leading-tight text-gray-900 hover:underline">
          {name}
        </span>
      </div>
    </a>
  );
}
