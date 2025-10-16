import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "./User";

export interface IStudentProject extends Document {
  user: IUser["_id"];
  title: string;
  description?: string;
  techStack: string[];
  githubLink?: string;
  demoLink?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const StudentProjectSchema = new Schema<IStudentProject>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    techStack: [{ type: String, required: true }],
    githubLink: { type: String },
    demoLink: { type: String },
  },
  { timestamps: true }
);

export const StudentProject: Model<IStudentProject> =
  mongoose.models.StudentProject ||
  mongoose.model<IStudentProject>("StudentProject", StudentProjectSchema);
