import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/db";
import { StudentProject } from "@/model/StudentProject";
import { User } from "@/model/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await User.findOne({ email: session.user.email });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const projects = await StudentProject.find({ user: user._id });
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await User.findOne({ email: session.user.email });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { title, description, techStack, githubLink, demoLink } =
    await req.json();

  const project = await StudentProject.create({
    user: user._id,
    title,
    description,
    techStack,
    githubLink,
    demoLink,
  });

  return NextResponse.json(project, { status: 201 });
}
