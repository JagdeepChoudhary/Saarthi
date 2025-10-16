import mongoose, { Schema, models } from "mongoose";

const JobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["Internship", "Full-time", "Part-time"],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
    },
    deadline: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // ✅ Requirements: store bullet points or paragraphs as array of strings
    requirements: {
      type: [String],
      default: [],
    },
    // ✅ Comma-separated or array of skills
    skills: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["Active", "Closed"],
      default: "Active",
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Recruiter or placement cell
      required: true,
    },
  },
  { timestamps: true }
);

export const Job = models.Job || mongoose.model("Job", JobSchema);
