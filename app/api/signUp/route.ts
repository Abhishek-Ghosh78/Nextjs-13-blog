import userModel from "@/utils/schema";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import validator from "validator";
import connectDB from "@/db/connect";

export async function POST(req: Request) {
  try {
    connectDB();
    const { name, email, password } = await req.json();
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" });
    }
    if (!validator.isStrongPassword(password)) {
      return NextResponse.json({ error: "Password not strong enough!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      name: name,
      email: email,
      password: hashPassword,
    });
    await userModel.create(user);

    console.log("user created successfully");
    return NextResponse.json({ name, email, userId: user.id }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating user" });
  }
}
