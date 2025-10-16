import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "./User";

export interface IStudentProfile extends Document {
  user: IUser["_id"]; // Reference to the User model
  name: string;
  rollNo: string;
  phone?: string;
  dob?: string;
  location?: string;
  branch?: string;
  year?: string;
  bio?: string;
  github?: string;
  linkedin?: string;
  skills?: string[];
  resume?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const StudentProfileSchema = new Schema<IStudentProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: { type: String, required: true },
    rollNo: { type: String, required: true },
    phone: { type: String },
    dob: { type: String },
    location: { type: String },
    branch: { type: String },
    year: { type: String },
    bio: { type: String },
    github: { type: String },
    linkedin: { type: String },
    skills: [{ type: String }],
    resume: { type: String },
  },
  { timestamps: true }
);

export const StudentProfile: Model<IStudentProfile> =
  mongoose.models.StudentProfile ||
  mongoose.model<IStudentProfile>("StudentProfile", StudentProfileSchema);
