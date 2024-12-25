export default function AttributeListItem({ collection, onEdit, onDelete }) {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div>
        <h3 className="font-bold">{collection.name}</h3>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(collection)}
          className="px-4 py-2 bg-blue-500 text-white rounded">
          Edit
        </button>
        <button
          onClick={() => onDelete(collection.id)}
          className="px-4 py-2 bg-red-500 text-white rounded">
          Delete
        </button>
      </div>
    </div>
  );
}
