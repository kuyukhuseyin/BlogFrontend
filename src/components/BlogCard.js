import Link from 'next/link';
import { ArrowRightIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function BlogCard({ blog, onDelete }) {
  function getColor() {
    let colors = [
      'bg-red-600', 'bg-blue-600', 'bg-green-600', 'bg-yellow-600',
      'bg-indigo-600', 'bg-purple-600', 'bg-pink-600', 'bg-teal-600',
      'bg-orange-600', 'bg-lime-600',
      'bg-gray-600', 'bg-amber-600', 'bg-cyan-600', 'bg-violet-600',
      'bg-fuchsia-600', 'bg-rose-600', 'bg-sky-600', 'bg-stone-600',
      'bg-neutral-600', 'bg-warmGray-600',
      'bg-emerald-600', 'bg-mint-600', 'bg-charcoal-600', 'bg-sapphire-600',
      'bg-cobalt-600', 'bg-maroon-600'
    ];
    if (blog.author.length > 26) {
      return colors[Math.floor(Math.random() * colors.length)];
    } else {
      return colors[blog.author.length];
    }
  }


  let authorColor = getColor(); // Get a color for the author circle

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="p-6 flex flex-col h-full">
        <div className="flex-grow">
          <h2 className="text-2xl font-bold mb-3 text-gray-800 hover:text-blue-600 transition-colors">
            {blog.title}
          </h2>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {blog.content}
          </p>
        </div>
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <div className={`${authorColor} w-8 h-8 rounded-full flex items-center justify-center`}>
                <span className="text-white font-medium">
                  {blog.author[0].toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{blog.author}</p>
                <p className="text-xs text-gray-500">
                  {new Date(blog.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <Link
              href={`/blog/${blog.id}`}
              className="flex-1 bg-transparent text-gray-600 p-2 rounded-lg flex items-center justify-center hover:text-blue-600 hover:bg-gray-100 transition-colors"
            >
              <ArrowRightIcon className="h-6 w-6" />
            </Link>
            <Link
              href={`/edit/${blog.id}`}
              className="flex-1 bg-transparent text-gray-600 p-2 rounded-lg flex items-center justify-center hover:text-emerald-600 hover:bg-gray-100 transition-colors"
            >
              <PencilSquareIcon className="h-6 w-6" />
            </Link>
            <button
              onClick={() => onDelete(blog.id)}
              className="flex-1 bg-transparent text-gray-600 p-2 rounded-lg flex items-center justify-center hover:text-red-600 hover:bg-gray-100 transition-colors"
            >
              <TrashIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
