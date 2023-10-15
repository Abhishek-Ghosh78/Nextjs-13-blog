/*
  Warnings:

  - You are about to drop the column `imageName` on the `post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_imageName_fkey";

-- AlterTable
ALTER TABLE "post" DROP COLUMN "imageName";

-- CreateTable
CREATE TABLE "imagePost" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "imageName" TEXT NOT NULL,

    CONSTRAINT "imagePost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "imagePost" ADD CONSTRAINT "imagePost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imagePost" ADD CONSTRAINT "imagePost_imageName_fkey" FOREIGN KEY ("imageName") REFERENCES "image"("imageName") ON DELETE RESTRICT ON UPDATE CASCADE;
