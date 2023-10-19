import userModel from "@/utils/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import connectDB from "@/db/connect";

export async function POST(req: Request) {
  try {
    connectDB();
    const { email, password } = await req.json();
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ error: "User does not exists" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password!);
    if (!isValidPassword) {
      return NextResponse.json({ error: "Please check your password" });
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as jwt.Secret,
      {
        expiresIn: "1h",
      }
    );
    console.log("login success");
    return NextResponse.json({ token, useId: user.id, email });
  } catch (error) {
    return NextResponse.json({ error: "Unable to login" });
  }
}
