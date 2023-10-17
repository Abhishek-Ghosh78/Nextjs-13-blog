import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { title, content, slug, imageName, tagName, postStatus } =
    await req.json();
  try {
    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        slug: slug,
        tagName: tagName,
        status: postStatus,
      },
    });
    const postId = post.id;
    // console.log(post);
    return NextResponse.json({ post, postId });
  } catch (error) {
    console.error("Error creating post", error);
    return NextResponse.json({ error: "Error creating post" });
  }
}
