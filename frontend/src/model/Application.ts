import mongoose, { Schema, models } from "mongoose";

const ApplicationSchema = new Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentProfile",
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Applied",
        "Under Review",
        "Shortlisted",
        "Interview Scheduled",
        "Rejected",
        "Selected",
      ],
      default: "Applied",
    },
    interviewDate: {
      type: Date, // Set only if status is "Interview Scheduled"
      default: null,
    },
    resumeUrl: {
      type: String, // Optional resume link
    },
    coverLetter: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Application =
  models.Application || mongoose.model("Application", ApplicationSchema);
