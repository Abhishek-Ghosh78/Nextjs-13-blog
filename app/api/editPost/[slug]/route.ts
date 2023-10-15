import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

type Props = {
  params: {
    slug: string;
  };
};

export async function POST(req: Request, { params }: Props) {
  const { slug } = params;
  const { title, content, newSlug } = await req.json();
  try {
    const newPost = await prisma.post.update({
      where: {
        slug: slug,
      },
      data: {
        title: title,
        content: content,
        slug: newSlug,
      },
    });
    console.log(newPost);
    return NextResponse.json(newPost);
  } catch (error) {
    console.error("Error updating post", error);
    return NextResponse.json({ error: "Error updating post" });
  }
}
