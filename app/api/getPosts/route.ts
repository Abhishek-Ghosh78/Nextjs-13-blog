import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const posts = await prisma.post.findMany();
    // console.log(posts);
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching blog posts");
    return NextResponse.json({ error: "Error fetching blog posts" });
  }
}
