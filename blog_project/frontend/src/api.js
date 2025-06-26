const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export async function getPosts() {
  const res = await fetch(`${API_URL}/posts`);
  return res.json();
}

export async function getPost(id) {
  const res = await fetch(`${API_URL}/posts/${id}`);
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function register(name, email, password) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  return res.json();
}

export async function createPost(token, title, content) {
  const res = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ title, content })
  });
  return res.json();
}
