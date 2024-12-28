export default function TextInput({
  className,
  type = 'text',
  label,
  name,
  value,
  onChange,
  placeholder,
  isTextarea = false,
  prefix,
  min,
  maxLength,
  required,
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
          className="h-10 border mt-1 rounded px-4 py-2 w-full bg-gray-50 min-h-20 hover:bg-gray-100"
          value={value}
          maxLength={maxLength}
          required={required}
        />
      ) : (
        <div className="flex">
          {prefix ? (
            <span className="mt-1 inline-flex items-center px-3 text-sm text-gray-900 rounded-e-0 rounded-s-md bg-gray-200">
              {prefix}
            </span>
          ) : (
            <></>
          )}
          <input
            type={type}
            name={name}
            id={name}
            onChange={onChange}
            placeholder={placeholder}
            className={`h-10 border mt-1 px-4 w-full bg-gray-50 hover:bg-gray-100 ${
              prefix ? 'rounded-r-md rounded-l-none' : 'rounded'
            }`}
            value={value}
            min={min}
            maxLength={maxLength}
            required={required}
          />
        </div>
      )}
    </div>
  );
}
