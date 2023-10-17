import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const value = searchParams.get("search");
  // console.log(value);

  if (!value) return;

  try {
    const post = await prisma.post.findMany({
      where: {
        tagName: value,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
  }
}
