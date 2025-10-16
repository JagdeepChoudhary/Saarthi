import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/db";
import { Job } from "@/model/Job";

export async function GET() {
  try {
    await dbConnect();
    const jobs = await Job.find().sort({ createdAt: -1 });
    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("GET Jobs Error:", error);
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

    const job = await Job.create({
      title: data.title,
      company: data.company,
      type: data.type,
      location: data.location,
      salary: data.salary,
      deadline: data.deadline,
      description: data.description,
      requirements: data.requirements || [],
      skills: data.skills || [],
      postedBy: session.user.id,
    });

    return NextResponse.json({ job }, { status: 201 });
  } catch (error) {
    console.error("POST Job Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
