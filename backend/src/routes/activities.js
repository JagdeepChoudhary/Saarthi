import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Activity } from '../models/Activity.js';
import { auth } from '../middleware/auth.js';

const router = Router();

// Simple local storage for MVP
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});
const upload = multer({ storage });

// Get current user's activities
router.get('/', auth, async (req, res) => {
  const list = await Activity.find({ student: req.user.id }).sort({ createdAt: -1 });
  res.json(list);
});

// Create activity
router.post('/', auth, upload.single('evidence'), async (req, res) => {
  try {
    const { title, category, description, date } = req.body;
    const evidenceUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
    const activity = await Activity.create({ student: req.user.id, title, category, description, date, evidenceUrl });
    res.json(activity);
  } catch (e) {
    res.status(500).json({ message: 'Failed to create activity', error: e.message });
  }
});

// Update activity (only by owner and if pending)
router.patch('/:id', auth, async (req, res) => {
  const act = await Activity.findById(req.params.id);
  if (!act) return res.status(404).json({ message: 'Not found' });
  if (act.student.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
  if (act.status !== 'pending') return res.status(400).json({ message: 'Cannot edit approved/rejected' });
  Object.assign(act, req.body);
  await act.save();
  res.json(act);
});

// Delete activity (only by owner and if pending)
router.delete('/:id', auth, async (req, res) => {
  const act = await Activity.findById(req.params.id);
  if (!act) return res.status(404).json({ message: 'Not found' });
  if (act.student.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
  if (act.status !== 'pending') return res.status(400).json({ message: 'Cannot delete approved/rejected' });
  await act.deleteOne();
  res.json({ ok: true });
});

export default router;
