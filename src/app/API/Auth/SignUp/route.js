import User from "@/app/Models/userLogin";
import { connectDB } from "@/app/lib/MongoConfig";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, email, password, confirmPassword } = await req.json();
  await connectDB();

  try {
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      confirmPassword,
      role: "user",
    });
    await newUser.save();
    return NextResponse.json(
      { message: "User registered successfully!", role: "user" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in signup:", error);
    return NextResponse.json(
      { message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
}
