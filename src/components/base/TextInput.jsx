export default function TextInput({
  className,
  type = 'text',
  label,
  name,
  value,
  onChange,
  placeholder,
  isTextarea = false,
}) {
  return (
    <div className={`md:col-span-5 ${className}`}>
      <label htmlFor={name} className="font-medium">
        {label}
      </label>
      {isTextarea ? (
        <textarea
          name={name}
          id={name}
          onChange={onChange}
          placeholder={placeholder}
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 min-h-20 hover:bg-gray-100"
          value={value}
        />
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          onChange={onChange}
          placeholder={placeholder}
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 hover:bg-gray-100"
          value={value}
        />
      )}
    </div>
  );
}
