import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    category: { type: String, enum: ['conference', 'workshop', 'certification', 'club', 'competition', 'internship', 'community', 'leadership', 'mooc', 'other'], default: 'other' },
    description: { type: String },
    date: { type: Date, default: Date.now },
    evidenceUrl: { type: String },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
  },
  { timestamps: true }
);

export const Activity = mongoose.model('Activity', ActivitySchema);
