import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/options";
import dbConnect from "@/lib/db";
import { Application } from "@/model/Application";
import { Job } from "@/model/Job";
import { StudentProfile } from "@/model/StudentProfile";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: jobId } = await context.params;
    const data = await req.json();

    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const student = await StudentProfile.findOne({ user: session.user.id });
    if (!student) {
      return NextResponse.json(
        { error: "Student profile not found" },
        { status: 404 }
      );
    }

    const existingApp = await Application.findOne({
      job: jobId,
      student: student._id,
    });
    if (existingApp) {
      return NextResponse.json({ error: "Already applied" }, { status: 400 });
    }

    const application = await Application.create({
      job: jobId,
      student: student._id,
      resumeUrl: data.resumeUrl,
      coverLetter: data.coverLetter,
    });

    return NextResponse.json({ application }, { status: 201 });
  } catch (error) {
    console.error("POST Application Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
