export default function CategoryListItem({ name, urlKey, image }) {
  return (
    <a
      href={`/${urlKey}`}
      className="rounded-lg border border-gray-400 bg-white p-6 shadow-sm">
      <div className="h-28">
        <img
          className="mx-auto h-full"
          src={`${window.origin}/api/files/categories/${image}`}
          alt={name}
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
