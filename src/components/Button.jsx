export default function Button({ type = 'button', children }) {
  return (
    <button
      type={type}
      className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {children}
    </button>
  );
}
