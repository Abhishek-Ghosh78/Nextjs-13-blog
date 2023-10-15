import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const image = await prisma.image.findMany();
    return NextResponse.json(image);
  } catch (error) {
    console.error("Error fetching image", error);
    return NextResponse.json({ error: "Error fetching image" });
  }
}
