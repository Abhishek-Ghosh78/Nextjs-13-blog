import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { postId, imageName } = await req.json();
    console.log(postId);
    const imagePost = await prisma.postImage.create({
      data: {
        postId: Number(postId),
        imageName: imageName,
      },
    });
    console.log(imagePost);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}
