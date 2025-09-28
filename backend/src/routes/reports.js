import { Router } from 'express';
import { Activity } from '../models/Activity.js';
import { auth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/summary', auth, requireRole('admin'), async (req, res) => {
  const total = await Activity.countDocuments();
  const approved = await Activity.countDocuments({ status: 'approved' });
  const pending = await Activity.countDocuments({ status: 'pending' });
  const rejected = await Activity.countDocuments({ status: 'rejected' });
  const byCategory = await Activity.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $project: { category: '$_id', count: 1, _id: 0 } }
  ]);
  res.json({ total, approved, pending, rejected, byCategory });
});

router.get('/activities.csv', auth, requireRole('admin'), async (req, res) => {
  const list = await Activity.find({}).populate('student', 'name email');
  const header = 'student_name,student_email,title,category,status,date\n';
  const rows = list
    .map(a => `${a.student?.name || ''},${a.student?.email || ''},"${a.title}",${a.category},${a.status},${new Date(a.date).toISOString()}`)
    .join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.send(header + rows + '\n');
});

export default router;
