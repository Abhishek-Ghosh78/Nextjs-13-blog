import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

type Props = {
  params: {
    id: string;
  };
};

export async function GET(req: Request, { params }: Props) {
  const { id } = params;
  try {
    const imageUrl = await prisma.image.findMany({
      where: {
        postId: Number(id),
      },
    });
    console.log(imageUrl);
    return NextResponse.json(imageUrl);
  } catch (error) {
    console.error("Error fetching imageUrl", error);
    return NextResponse.json({ error: "Error fetching imageUrl" });
  }
}
