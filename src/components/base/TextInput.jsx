export default function TextInput({
  className,
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
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 min-h-20"
          value={value}
        />
      ) : (
        <input
          type="text"
          name={name}
          id={name}
          onChange={onChange}
          placeholder={placeholder}
          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
          value={value}
        />
      )}
    </div>
  );
}
