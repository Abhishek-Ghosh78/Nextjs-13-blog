import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

type Props = {
  params: {
    id: string;
  };
};

export async function POST(req: Request, { params }: Props) {
  try {
    const { id } = params;
    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!post) return NextResponse.json({ error: "Post not found" });
    const deletePost = await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });
    console.error(deletePost);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" });
  }
}
