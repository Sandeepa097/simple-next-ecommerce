export default function Input({
  className = '',
  type = 'text',
  prefix = '',
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="flex">
      {prefix ? (
        <span className="inline-flex items-center px-3 text-sm border rounded-e-0 border-e-0 rounded-s-md bg-gray-600 text-gray-400 border-gray-600">
          {prefix}
        </span>
      ) : (
        <></>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="rounded-none rounded-e-lg border block flex-1 min-w-0 w-full text-sm p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}
