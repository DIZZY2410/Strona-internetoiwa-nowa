import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) { setError('Login first'); return; }
    const data = await createPost(token, title, content);
    if (data.msg === 'Post created') {
      navigate('/');
    } else {
      setError(data.msg || 'Failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">New Post</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border p-2" type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea className="w-full border p-2 h-60" placeholder="Content" value={content} onChange={e => setContent(e.target.value)} required />
        <button className="w-full bg-green-600 text-white p-2 rounded" type="submit">Publish</button>
      </form>
    </div>
  );
}
