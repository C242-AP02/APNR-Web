import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500">
      <div className="flex items-center space-x-6">
        <div className="text-4xl font-bold border-r pr-6 text-indigo-900">404</div>
        <div className="text-base text-gray-200">This page could not be found.</div>
      </div>
      <Link
        href="/"
        className="mt-6 px-4 py-2 bg-indigo-900 text-white rounded-md hover:bg-indigo-700 transition"
      >
        Go to Landing Page
      </Link>
    </div>
  );
}
