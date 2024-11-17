export default function MenuContentHeaderButton({ text, href }) {
  return (
    <a
      href={href}
      className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <span>{text}</span>
    </a>
  );
}
