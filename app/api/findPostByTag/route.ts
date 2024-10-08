import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const value = searchParams.get("search");
  // console.log(value);

  try {
    const post = await prisma.post.findMany({
      where: {
        tagName: String(value),
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" });
  }
}
