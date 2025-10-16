import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/db";
import { Application } from "@/model/Application";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Await params before accessing its properties
    const { id: appId } = await params;
    const data = await req.json();

    // Validate allowed status values
    const validStatuses = [
      "Applied",
      "Under Review",
      "Shortlisted",
      "Interview Scheduled",
      "Rejected",
      "Selected",
    ];

    if (data.status && !validStatuses.includes(data.status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    interface UpdateData {
      status?: string;
      interviewDate?: Date;
    }
    const updateData: UpdateData = {};

    if (data.status) updateData.status = data.status;
    if (data.interviewDate)
      updateData.interviewDate = new Date(data.interviewDate);

    const updatedApp = await Application.findByIdAndUpdate(appId, updateData, {
      new: true,
    }).populate("job student");

    if (!updatedApp) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Application updated successfully",
      application: updatedApp,
    });
  } catch (error) {
    console.error("PATCH Application Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
