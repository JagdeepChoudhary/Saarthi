import mongoose, { Schema, Document } from "mongoose";

export interface ICertification extends Document {
  studentId: mongoose.Types.ObjectId;
  name: string;
  issuer: string;
  date?: Date;
  verified: boolean;
  verifiedBy?: mongoose.Types.ObjectId;
  verifiedAt?: Date;
}

const CertificationSchema = new Schema<ICertification>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    name: { type: String, required: true },
    issuer: { type: String, required: true },
    date: { type: Date },
    verified: { type: Boolean, default: false },
    verifiedBy: { type: Schema.Types.ObjectId, ref: "User" },
    verifiedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Certification ||
  mongoose.model<ICertification>("Certification", CertificationSchema);
