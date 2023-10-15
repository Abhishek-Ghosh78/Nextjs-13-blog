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
    const postSlug = await prisma.post.findUnique({
      where: { slug: params.slug },
    });
    console.log(postSlug);
    return NextResponse.json(postSlug);
  } catch (error) {
    console.error("Error fetching blog from slug");
    return NextResponse.json({ error: "Error fetching blog from slug" });
  }
}
