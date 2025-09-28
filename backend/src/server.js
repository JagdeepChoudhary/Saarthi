import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import activityRoutes from './routes/activities.js';
import approvalRoutes from './routes/approvals.js';
import portfolioRoutes from './routes/portfolio.js';
import reportRoutes from './routes/reports.js';

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL?.split(',') || '*', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static for uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/approvals', approvalRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/reports', reportRoutes);

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

connectDB(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
  })
  .catch((e) => {
    console.error('DB connection failed', e);
    process.exit(1);
  });
