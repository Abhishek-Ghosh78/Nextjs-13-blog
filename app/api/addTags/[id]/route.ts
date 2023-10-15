import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

type Props = {
  params: {
    id: string;
  };
};

export async function POST(req: Request, { params }: Props) {
  const { id } = params;
  const { tag } = await req.json();
  try {
    const tagPost = await prisma.tag.create({
      data: {
        tagName: tag,
      },
    });
    return NextResponse.json(tagPost);
  } catch (error) {
    console.error("Error adding tag to post", error);

    return NextResponse.json({ error: "Error adding tag to post" });
  }
}
