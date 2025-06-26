import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../api';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(data => setPosts(data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      {posts.map(post => (
        <div key={post.id} className="bg-white p-4 mb-4 rounded shadow">
          <h2 className="text-xl font-semibold">
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </h2>
          <p className="text-gray-600">by {post.author} on {new Date(post.created_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
