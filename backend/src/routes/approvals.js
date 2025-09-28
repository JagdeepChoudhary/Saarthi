import { Router } from 'express';
import { Activity } from '../models/Activity.js';
import { auth, requireRole } from '../middleware/auth.js';

const router = Router();

// List pending activities
router.get('/pending', auth, requireRole('faculty', 'admin'), async (req, res) => {
  const list = await Activity.find({ status: 'pending' }).populate('student', 'name email');
  res.json(list);
});

router.post('/:id/approve', auth, requireRole('faculty', 'admin'), async (req, res) => {
  const act = await Activity.findById(req.params.id);
  if (!act) return res.status(404).json({ message: 'Not found' });
  act.status = 'approved';
  act.reviewer = req.user.id;
  await act.save();
  res.json(act);
});

router.post('/:id/reject', auth, requireRole('faculty', 'admin'), async (req, res) => {
  const act = await Activity.findById(req.params.id);
  if (!act) return res.status(404).json({ message: 'Not found' });
  act.status = 'rejected';
  act.reviewer = req.user.id;
  await act.save();
  res.json(act);
});

export default router;
