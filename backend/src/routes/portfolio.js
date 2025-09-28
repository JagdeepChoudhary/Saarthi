import { Router } from 'express';
import PDFDocument from 'pdfkit';
import { Activity } from '../models/Activity.js';
import { User } from '../models/User.js';

const router = Router();

// Public portfolio JSON (minimal)
router.get('/:userId/public', async (req, res) => {
  const user = await User.findById(req.params.userId).select('name email role');
  if (!user) return res.status(404).json({ message: 'User not found' });
  const activities = await Activity.find({ student: user._id, status: 'approved' }).sort({ date: -1 });
  res.json({ user, activities });
});

// Auth not strictly required for PDF placeholder (public by link)
router.get('/:userId/pdf', async (req, res) => {
  const user = await User.findById(req.params.userId).select('name email');
  if (!user) return res.status(404).json({ message: 'User not found' });
  const activities = await Activity.find({ student: user._id, status: 'approved' }).sort({ date: -1 });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename=portfolio-${user._id}.pdf`);

  const doc = new PDFDocument({ margin: 40 });
  doc.pipe(res);

  doc.fontSize(20).text('Smart Student Hub - Portfolio', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`Name: ${user.name}`);
  doc.text(`Email: ${user.email}`);
  doc.moveDown();
  doc.fontSize(16).text('Verified Activities');
  doc.moveDown(0.5);
  activities.forEach((a, i) => {
    doc.fontSize(12).text(`${i + 1}. ${a.title} (${a.category}) - ${new Date(a.date).toDateString()}`);
    if (a.description) doc.fontSize(10).text(a.description);
    doc.moveDown(0.5);
  });

  doc.end();
});

// Private full JSON (for internal use)
router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId).select('name email');
  if (!user) return res.status(404).json({ message: 'User not found' });
  const activities = await Activity.find({ student: user._id, status: 'approved' }).sort({ date: -1 });
  res.json({ user, activities });
});

export default router;
