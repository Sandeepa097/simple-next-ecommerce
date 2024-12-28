import { useState } from 'react';

export function DropDownList({ items, onClick }) {
  return (
    <div className="z-10 absolute top-10 right-0 rounded shadow bg-white overflow-hidden peer-checked:flex flex-col w-full border border-gray-200">
      {items.map((item) => (
        <div key={item.value} className="cursor-pointer group">
          <a
            onClick={() => onClick(item.id)}
            className="block p-2 border-transparent border-l-2 group-hover:border-gray-500 group-hover:bg-gray-100">
            {item.text}
          </a>
        </div>
      ))}
    </div>
  );
}

export default function Dropdown({
  className,
  items,
  label,
  name,
  placeholder,
  value,
  onChange,
  required = false,
}) {
  const [dropdownOpened, setDropdownOpened] = useState(false);

  return (
    <div className={`md:col-span-5 ${className}`}>
      <label htmlFor="select" className="font-medium block py-2">
        {label}
      </label>

      <div className="relative">
        <div
          className="group h-10 flex border border-gray-200 rounded items-center bg-gray-50 hover:bg-gray-100"
          onClick={() => setDropdownOpened(!dropdownOpened)}>
          <input
            value={
              value ? items.find((item) => item.value === value)?.text : ''
            }
            name={name}
            id={name}
            placeholder={placeholder}
            className="px-4 appearance-none outline-none text-gray-800 w-full cursor-pointer bg-gray-50 group-hover:bg-gray-100"
            onKeyDown={(e) => e.preventDefault()}
            onChange={() => {}}
            style={{ pointerEvents: 'none', caretColor: 'transparent' }}
            required={required}
          />

          <div
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpened(false);
              onChange(null);
            }}
            className="cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600">
            <svg
              className="w-4 h-4 mx-2 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
          <label
            htmlFor="show_more"
            className={`cursor-pointer outline-none focus:outline-none border-l border-gray-200 transition-all text-gray-300 hover:text-gray-600 ${
              !dropdownOpened ? 'rotate-180' : ''
            }`}>
            <svg
              className="w-4 h-4 mx-2 fill-current transition-transform duration-200"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </label>
        </div>

        {dropdownOpened && (
          <DropDownList
            items={items}
            onClick={(value) => {
              setDropdownOpened(false);
              onChange(value);
            }}
          />
        )}
      </div>
    </div>
  );
}
