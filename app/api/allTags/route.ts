import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const tags = await prisma.tag.findMany();
    // console.log(tags);
    return NextResponse.json(tags);
  } catch (error) {
    console.error("Error fetching tags", error);
    return NextResponse.json({ error: "Error fetching tags" });
  }
}
