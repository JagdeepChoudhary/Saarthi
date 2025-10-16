import { z } from "zod";
import { NextRequest } from "next/server";
import { User } from "@/model/User";
import dbConnect from "@/lib/db";
import { username } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: username,
});

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const queryParams = { username: searchParams.get("username") };

    const result = UsernameQuerySchema.safeParse(queryParams);
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors.length > 0
              ? usernameErrors.join(", ")
              : "Invalid query parameters",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    const existingUser = await User.findOne({ username });

    return Response.json(
      existingUser
        ? { success: false, message: "Username is already taken" }
        : { success: true, message: "Username is unique" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking username:", error);
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
