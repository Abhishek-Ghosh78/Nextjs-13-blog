import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

type Props = {
  params: {
    id: string;
  };
};

export async function GET(req: Request, { params }: Props) {
  // console.log(params.id);
  try {
    const { id } = params;
    const postImages = await prisma.postImage.findMany({
      where: {
        postId: Number(id),
      },
      include: {
        image: true,
      },
    });
    // if (!postImages) return;
    // const imageUrl = postImages.map((postImages) => postImages.image.imageUrl);
    // return NextResponse.json(imageUrl);
    // console.log(postImages);
    return NextResponse.json(postImages[0].image.imageUrl);
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" });
  }
}
