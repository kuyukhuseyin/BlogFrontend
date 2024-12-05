'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Comments from '@/components/Comments';

export default function BlogDetail() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    let savedBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    let foundBlog = savedBlogs.find(b => b.id.toString() === params.id);
    if (foundBlog) {
      setBlog(foundBlog);
    }

    let savedComments = JSON.parse(localStorage.getItem('comments') || '[]');
    setComments(savedComments.filter(c => c.blogId.toString() === params.id));
  }, [params.id]);

  const handleAddComment = (newComment) => {
    let savedComments = JSON.parse(localStorage.getItem('comments') || '[]');
    let updatedComments = [...savedComments, newComment];
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    setComments(comments => [...comments, newComment]);
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">{blog.title}</h1>
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-xl text-white font-medium">
              {blog.author[0].toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-lg font-medium text-gray-800">{blog.author}</p>
            <p className="text-gray-500">{new Date(blog.date).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed text-lg">{blog.content}</p>
        </div>
      </div>

      <button
        onClick={() => router.push('/')}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2 mb-8"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        <span>Back to Home</span>
      </button>

      <Comments 
        comments={comments}
        onAddComment={handleAddComment}
        blogId={params.id}
      />
    </div>
  );
}