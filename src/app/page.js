'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BlogCard from '@/components/BlogCard';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    let savedBlogs = localStorage.getItem('blogs');
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    } else {
      let defaultBlogs = [
        {
          id: 1,
          title: "The Benefits of Morning Exercise",
          content: "Starting your day with exercise boosts energy levels and improves focus throughout the day. A morning workout helps to kickstart metabolism and promotes better overall health.",
          author: "Emily Johnson",
          date: "2024-03-01"
        },
        {
          id: 2,
          title: "How to Stay Motivated at Work",
          content: "Finding motivation at work can be challenging, but setting small goals can make tasks seem more achievable. Taking short breaks also helps maintain focus and creativity.",
          author: "Mark Thompson",
          date: "2024-03-02"
        },
        {
          id: 3,
          title: "The Future of Artificial Intelligence",
          content: "Artificial intelligence is revolutionizing various industries, from healthcare to transportation. As technology advances, AI is expected to play a crucial role in shaping the future of work and daily life.",
          author: "Sarah Lee",
          date: "2024-03-03"
        },
        {
          id: 4,
          title: "Exploring New Hiking Trails",
          content: "Hiking offers a great way to reconnect with nature and explore new landscapes. Whether through forests or mountain ranges, every trail offers a unique adventure.",
          author: "Jack Wilson",
          date: "2024-03-04"
        },
        {
          id: 5,
          title: "JavaScript Performance Optimization",
          content: "Optimize your JavaScript applications with these proven techniques for better performance and user experience...",
          author: "David Brown",
          date: "2024-03-05"
        }
      ];
      localStorage.setItem('blogs', JSON.stringify(defaultBlogs));
      setBlogs(defaultBlogs);
    }
  }, []);

  const handleDelete = (id) => {
    let updatedBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(updatedBlogs);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <BlogCard 
            key={blog.id}
            blog={blog}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}