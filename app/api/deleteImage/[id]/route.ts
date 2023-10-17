import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import s3 from "@/aws/config";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

const prisma = new PrismaClient();

type Props = {
  params: {
    id: string;
  };
};

export async function POST(req: Request, { params }: Props) {
  try {
    const { id } = params;
    const { name } = await req.json();
    // console.log(name);

    const image = await prisma.image.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!image) return NextResponse.json({ error: "Image not found" });
    await prisma.image.delete({
      where: {
        id: Number(id),
      },
    });
    const uploadParams: any = {
      Bucket: process.env.AWS_BUCKET as string,
      Key: `images/${name}`,
    };
    const command = new DeleteObjectCommand(uploadParams);
    const result = await s3.send(command);

    // if (result) {
    //   // console.log(`${uploadParams.key} deleted successfully`);
    // } else console.log("Error deleting from s3");

    return NextResponse.json(
      { message: "Image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    throw new Error("Error deleting image");
    // console.error("Error deleting image", error);
    return NextResponse.json({ error: "Error deleting image" });
  }
}
