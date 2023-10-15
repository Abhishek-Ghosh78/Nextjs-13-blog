import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { tag } = await req.json();
  try {
    const createTag = await prisma.tag.create({
      data: {
        tagName: tag,
      },
    });
    return NextResponse.json(createTag);
  } catch (error) {
    console.error("Error creating tags", error);
    return NextResponse.json({ error: "Error creating tags" });
  }
}
