import Link from 'next/link';

export default function Page({ user }) {
  return (
    <div>
      <Link href="/admin/account">
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Account
        </button>
      </Link>
    </div>
  );
}
