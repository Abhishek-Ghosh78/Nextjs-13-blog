import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const post = await prisma.post.findUnique({
      where: {
        slug: slug,
      },
      include: { image: true },
    });
    const imageUrl = post?.image.imageUrl;
    return NextResponse.json(imageUrl);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" });
  }
}
