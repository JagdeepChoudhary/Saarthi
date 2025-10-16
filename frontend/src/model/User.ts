import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  name: string;
  email: string;
  role: "student" | "recruiter" | "placement_cell" | "mentor" | "supervisor";
  status: "active" | "inactive";
  joinedOn: Date;
  password?: string;
  image?: string;
  loginType: string;
  isEmailVerified: boolean;
  refreshToken: string;
  forgotPasswordToken: string;
  forgotPasswordExpiry: Date;
  emailVerificationToken: string;
  emailVerificationExpiry: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["student", "recruiter", "placement_cell", "mentor", "supervisor"],
      default: "student",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    joinedOn: {
      type: Date,
      default: Date.now,
    },
    password: { type: String },
    image: { type: String },
    loginType: {
      type: String,
      enum: ["email", "google", "facebook"],
      default: "email",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
