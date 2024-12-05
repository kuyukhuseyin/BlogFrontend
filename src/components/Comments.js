import { useState } from "react";

export default function Comments({ comments = [], onAddComment, blogId }) {
    const [comment, setComment] = useState('');
    const [name, setName] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!comment.trim() || !name.trim()) return;
      
      onAddComment({
        id: Date.now(),
        blogId,
        name,
        content: comment,
        date: new Date().toISOString()
      });
      setComment('');
      setName('');
    };
  
    return (
      <div className="mt-8 border-t pt-8">
        <h3 className="text-2xl font-bold mb-6">Comments</h3>
        
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-24"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Post Comment
          </button>
        </form>
  
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">{comment.name[0].toUpperCase()}</span>
                  </div>
                  <span className="font-medium">{comment.name}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(comment.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }