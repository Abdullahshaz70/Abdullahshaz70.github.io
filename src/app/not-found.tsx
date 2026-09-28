import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950 text-white">
      <div className="text-center">
        <h2 className="text-5xl font-bold mb-4">404</h2>
        <p className="text-gray-400 mb-8">Page not found</p>
        <Link
          href="/"
          className="px-6 py-2 bg-primary text-dark-950 rounded font-bold hover:opacity-80"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
