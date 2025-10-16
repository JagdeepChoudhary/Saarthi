import { Schema, model, models } from "mongoose";

const SubjectSchema = new Schema({
  subjectName: { type: String, required: true },
  subjectCode: { type: String },
  credits: { type: Number, required: true },
  marksObtained: { type: Number, required: true },
  totalMarks: { type: Number, required: true },
  grade: {
    type: String,
    required: true,
    enum: ["A+", "A", "B+", "B", "C", "D", "E", "F"],
  },
});

const SemesterSchema = new Schema({
  sem: { type: String, required: true }, // e.g., "Sem 1"
  sgpa: { type: Number, required: true },
  credits: { type: Number, required: true },
  subjects: [SubjectSchema],
});

// Virtual field for backlog count
SemesterSchema.virtual("backlogs").get(function () {
  return this.subjects.filter((sub) => sub.grade === "F").length;
});

const StudentAcademicsSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "StudentProfile",
      required: true,
    },
    semesters: [SemesterSchema],
    cgpa: { type: Number },
    attendancePercentage: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const StudentAcademics =
  models.StudentAcademics || model("StudentAcademics", StudentAcademicsSchema);
