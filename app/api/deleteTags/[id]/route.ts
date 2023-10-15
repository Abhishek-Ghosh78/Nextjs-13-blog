import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const deleteTag = await prisma.tag.delete({
      where: { id: Number(id) },
    });
    // console.log(deleteTag);
    return NextResponse.json(deleteTag);
  } catch (error) {
    console.error("Error deleting tag", error);
    return NextResponse.json({ error: "Error deleting tag" });
  }
}
