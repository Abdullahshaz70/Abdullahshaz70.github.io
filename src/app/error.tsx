'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-950 text-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-400 mb-8">{error.message}</p>
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-primary text-dark-950 rounded font-bold hover:opacity-80"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
