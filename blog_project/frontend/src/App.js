import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PostView from './components/PostView';
import Login from './components/Login';
import Register from './components/Register';
import NewPost from './components/NewPost';

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new" element={<NewPost />} />
        </Routes>
      </div>
    </div>
  );
}
