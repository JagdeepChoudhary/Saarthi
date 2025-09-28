import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already in use' });
    const user = await User.create({ name, email, password, role: role || 'student' });
    return res.json({ id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (e) {
    return res.status(500).json({ message: 'Registration failed', error: e.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (e) {
    return res.status(500).json({ message: 'Login failed', error: e.message });
  }
});

router.get('/me', async (req, res) => {
  return res.json({ ok: true });
});

export default router;
