import express from 'express';
import { pool } from '../models/db.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// list posts
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT p.id, p.title, p.content, p.created_at, u.name AS author FROM posts p JOIN users u ON p.author_id = u.id ORDER BY p.created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// single post
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await pool.query(
      'SELECT p.id, p.title, p.content, p.created_at, u.name AS author FROM posts p JOIN users u ON p.author_id = u.id WHERE p.id = ?',
      [id]
    );
    if (!rows.length) return res.status(404).json({ msg: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// create
router.post('/', verifyToken, async (req, res) => {
  const { title, content } = req.body;
  const author_id = req.user.id;
  try {
    await pool.query('INSERT INTO posts(title, content, author_id) VALUES (?,?,?)', [title, content, author_id]);
    res.json({ msg: 'Post created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// update
router.put('/:id', verifyToken, async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  const userId = req.user.id;
  try {
    const [rows] = await pool.query('SELECT author_id FROM posts WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).json({ msg: 'Post not found' });
    if (rows[0].author_id !== userId) return res.status(403).json({ msg: 'Forbidden' });
    await pool.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, id]);
    res.json({ msg: 'Updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// delete
router.delete('/:id', verifyToken, async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  try {
    const [rows] = await pool.query('SELECT author_id FROM posts WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).json({ msg: 'Post not found' });
    if (rows[0].author_id !== userId) return res.status(403).json({ msg: 'Forbidden' });
    await pool.query('DELETE FROM posts WHERE id = ?', [id]);
    res.json({ msg: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
