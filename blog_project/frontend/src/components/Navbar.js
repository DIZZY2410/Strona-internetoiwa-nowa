import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow mb-4">
      <div className="container mx-auto p-4 flex justify-between">
        <Link to="/" className="text-xl font-bold">Blog</Link>
        <div className="space-x-4">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/new" className="font-semibold">New Post</Link>
        </div>
      </div>
    </nav>
  );
}
