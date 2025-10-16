import { NextResponse } from "next/server";
import { User } from "@/model/User";
import { signUpSchema } from "@/schemas/signUpSchema"; // updated schema with role
import { hashPassword } from "@/utils/hashPassword";
import dbConnect from "@/lib/db";

export async function POST(request: Request) {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Parse request body
    const body = await request.json();

    // Validate body using Zod
    const { email, password, name, username, role } = signUpSchema.parse(body);

    // Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email or Username already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = await User.create({
      email,
      name,
      username,
      role, // include role
      password: hashedPassword,
    });

    // Remove password before sending response
    newUser.password = undefined;

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: (error as Error).message || "Something went wrong" },
      { status: 400 }
    );
  }
}
