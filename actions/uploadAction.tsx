"use server";
import { PrismaClient } from "@prisma/client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "@/aws/config";

const prisma = new PrismaClient();

const handleUpload = async (formData: FormData) => {
  const file = formData.get("file") as File;
  console.log(file);

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadParams: any = {
    Bucket: process.env.AWS_BUCKET as string,
    Key: `images/${file.name}`,
    Body: buffer,
  };

  const command = new PutObjectCommand(uploadParams);
  await s3.send(command);
  const imageUrl = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
  console.log(imageUrl);
  try {
    await prisma.image.create({
      data: {
        imageUrl: imageUrl,
      },
    });
  } catch (error) {
    console.error("Error creating blog post", error);
  }
};

export default handleUpload;
