export default function SubmitButton({ text }) {
  return (
    <div className="md:col-span-5 text-right">
      <div className="inline-flex items-end">
        <button
          type="submit"
          className="mt-2 bg-gray-800 hover:bg-gray-10 text-white font-bold py-2 px-4 rounded">
          {text}
        </button>
      </div>
    </div>
  );
}
