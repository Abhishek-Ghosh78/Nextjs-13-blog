import { PrismaClient } from "@prisma/client";
import s3 from "@/aws/config";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file: File | null = data.get("file") as unknown as File;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  console.log(buffer);

  const name = file.name + uuidv4();

  const uploadParams: any = {
    Bucket: process.env.BUCKET as string,
    Key: `images/${name}`,
    Body: buffer,
  };
  const command = new PutObjectCommand(uploadParams);
  await s3.send(command);
  const imageUrl = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
  try {
    const image = await prisma.image.create({
      data: {
        imageUrl: imageUrl,
        imageName: name,
      },
    });
    return NextResponse.json(image);
  } catch (error) {
    console.error("Error uploading image", error);
    return NextResponse.json({ error: "Error uploading image" });
  }
}
