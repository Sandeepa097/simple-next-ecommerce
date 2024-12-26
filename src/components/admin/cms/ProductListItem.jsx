export default function ProductListItem({ product, onEdit, onDelete }) {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div className="flex justify-start items-center gap-4">
        <div>
          <img
            src={`/api/files/products/${product.featuredImageUrl}`}
            alt={product.featuredImageAltText}
            className="w-20 h-20 object-cover"
          />
        </div>
        <div>
          <h3 className="font-bold">{product.title}</h3>
          <p className="text-gray-600">{product.description}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(product)}
          className="px-4 py-2 bg-blue-500 text-white rounded">
          Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="px-4 py-2 bg-red-500 text-white rounded">
          Delete
        </button>
      </div>
    </div>
  );
}
