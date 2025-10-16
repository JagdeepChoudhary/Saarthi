import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { StudentProfile } from "@/model/StudentProfile";
import { User } from "@/model/User";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/db";

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await User.findById(session.user.id);
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const profile = await StudentProfile.findOne({ user: user._id });

  // Merge profile with email and name from user model
  const mergedProfile = profile
    ? {
        ...profile.toObject(),
        email: user.email,
        name: user.name,
      }
    : {
        email: user.email,
        name: user.name,
      };

  return NextResponse.json(mergedProfile);
}

export async function PUT(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await User.findOne({ email: session.user.email });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const data = await req.json();

  // Automatically inject name and email from User model
  const updateData = {
    ...data,
    user: user._id,
    name: user.name,
    email: user.email, // <-- add this
  };

  const profile = await StudentProfile.findOneAndUpdate(
    { user: user._id },
    updateData,
    { new: true, upsert: true }
  );

  // Return updated profile with user email
  return NextResponse.json({
    ...profile.toObject(),
    email: user.email,
    name: user.name,
  });
}
