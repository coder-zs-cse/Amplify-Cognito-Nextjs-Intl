import { NextResponse } from "next/server";
import User from "@/db/model/user";
import bcrypt from "bcryptjs";
import dbConnect from "@/config/dbConfig";

export async function POST(req) {
  try {
    const { email, name, password, confirmPassword } = await req.json();

    // Check if all required fields are provided
    if (!email || !name || !password || !confirmPassword) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }
    await dbConnect()
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      name,
      password: hashedPassword
    });

    // Save the user to the database
    await newUser.save();

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}