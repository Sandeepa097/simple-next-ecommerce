export default function AttributeSelector({
  className,
  attributes,
  selectedAttributes,
  setSelectedAttributes,
}) {
  const toggleAttribute = (attribute) => {
    setSelectedAttributes((prev) =>
      prev.includes(attribute)
        ? prev.filter((attr) => attr !== attribute)
        : [...prev, attribute]
    );
  };

  return (
    <div className={`md:col-span-5 ${className}`}>
      <label className="block text-sm font-medium">Select Attributes</label>
      <div className="flex flex-wrap mt-2 gap-2">
        {attributes.map((attr) => (
          <button
            key={attr.id}
            type="button"
            className={`px-4 py-2 border rounded ${
              selectedAttributes.includes(attr.id)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
            onClick={() => toggleAttribute(attr.id)}>
            {attr.name}
          </button>
        ))}
        {!attributes ||
          (!attributes.length && (
            <p className="text-gray-500">No attributes available</p>
          ))}
      </div>
    </div>
  );
}
