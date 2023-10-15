import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { postId } = await req.json();
    const post = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });
    if (!post) return NextResponse.json({ error: "Post Not Found!" });
    const updatedPost = await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        status: "published",
      },
    });
    console.log(updatedPost);
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error(error);
    return NextResponse.json("Something went wrong");
  }
}
