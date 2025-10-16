import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/db";
import StudentCertification from "@/model/StudentCertification";
import { StudentProfile } from "@/model/StudentProfile";

export async function GET() {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const student = await StudentProfile.findOne({ user: session.user.id });
    if (!student) {
      return NextResponse.json({ certifications: [] });
    }

    const certifications = await StudentCertification.find({
      studentId: student._id,
    }).sort({ createdAt: -1 });

    return NextResponse.json({ certifications });
  } catch (error) {
    console.error("GET Certifications Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    // Use the correct field 'user' instead of 'userId'
    const student = await StudentProfile.findOne({ user: session.user.id });
    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const newCert = await StudentCertification.create({
      studentId: student._id,
      name: data.name,
      issuer: data.issuer,
      date: data.date || null,
      verified: false,
    });

    return NextResponse.json({ certification: newCert });
  } catch (error) {
    console.error("POST Certifications Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
