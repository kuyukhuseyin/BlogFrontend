'use client';
import { useRouter } from 'next/navigation';
import BlogForm from '@/components/BlogForm';

export default function CreateBlog() {
  const router = useRouter();

  const handleSubmit = (blogData) => {
    let savedBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    let newBlog = {
      ...blogData,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    };
    let updatedBlogs = [...savedBlogs, newBlog];
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    router.refresh();
    router.push('/');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Blog</h1>
      <BlogForm onSubmit={handleSubmit} />
    </div>
  );
}