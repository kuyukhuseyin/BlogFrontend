'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import BlogForm from '@/components/BlogForm';

export default function EditBlog() {
  const params = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    let savedBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    let foundBlog = savedBlogs.find(b => b.id.toString() === params.id);
    if (foundBlog) {
      setBlog(foundBlog);
    }
  }, [params.id]);

  const handleSubmit = (blogData) => {
    let savedBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    let updatedBlogs = savedBlogs.map(b => 
      b.id.toString() === params.id ? { ...blogData, id: b.id, date: b.date } : b
    );
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    router.refresh();
    router.push('/');
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>
      <BlogForm initialData={blog} onSubmit={handleSubmit} />
    </div>
  );
}