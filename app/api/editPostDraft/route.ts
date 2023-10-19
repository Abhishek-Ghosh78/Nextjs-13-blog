import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { title, content, postSlug } = await req.json();
    const post = await prisma.post.update({
      where: {
        slug: postSlug,
      },
      data: {
        title: title,
        content: content,
        slug: postSlug,
        status: "draft",
      },
    });
    // console.log(post);
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Error updating blog post" });
  }
}
