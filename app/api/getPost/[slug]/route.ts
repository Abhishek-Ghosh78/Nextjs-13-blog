import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

type Props = {
  params: {
    slug: string;
  };
};

export async function GET(req: Request, { params }: Props) {
  const { slug } = params;
  try {
    const post = await prisma.post.findUnique({
      where: {
        slug: slug,
      },
    });
    const postId = post?.id;
    return NextResponse.json({ post, postId });
  } catch (error) {
    console.error("Error fetching post", error);
    return NextResponse.json({ error: "Error fetching post" });
  }
}
