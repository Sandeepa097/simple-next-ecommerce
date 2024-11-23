export default function CategoryListItem({ category, onEdit, onDelete }) {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div>
        <h3 className="font-bold">{category.name}</h3>
        <p className="text-gray-600">{category.description}</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(category)}
          className="px-4 py-2 bg-blue-500 text-white rounded">
          Edit
        </button>
        <button
          onClick={() => onDelete(category.id)}
          className="px-4 py-2 bg-red-500 text-white rounded">
          Delete
        </button>
      </div>
    </div>
  );
}
