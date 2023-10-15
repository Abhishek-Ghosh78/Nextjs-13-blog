import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

type Props = {
  params: {
    slug: string;
  };
};

export async function GET(req: Request, { params }: Props) {
  try {
    const posts = await prisma.post.findMany();
    const filterPosts = posts.filter((post) => post.slug != params.slug);
    return NextResponse.json(filterPosts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" });
  }
}
