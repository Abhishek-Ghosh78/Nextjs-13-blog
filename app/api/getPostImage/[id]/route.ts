import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

type Props = {
  params: {
    id: string;
  };
};

export async function GET(req: Request, { params }: Props) {
  console.log(params.id);
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
    if (postImages) {
      const imageName = postImages.map((postImages) => postImages.image);
      return NextResponse.json(imageName);
    }
  } catch (error) {
    console.error(error);
  }
}
