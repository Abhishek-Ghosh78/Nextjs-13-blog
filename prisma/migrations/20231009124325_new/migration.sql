/*
  Warnings:

  - You are about to drop the `_imageTopost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_imageTopost" DROP CONSTRAINT "_imageTopost_A_fkey";

-- DropForeignKey
ALTER TABLE "_imageTopost" DROP CONSTRAINT "_imageTopost_B_fkey";

-- DropTable
DROP TABLE "_imageTopost";

-- CreateTable
CREATE TABLE "postImage" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "imageName" TEXT NOT NULL,

    CONSTRAINT "postImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "postImage" ADD CONSTRAINT "postImage_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postImage" ADD CONSTRAINT "postImage_imageName_fkey" FOREIGN KEY ("imageName") REFERENCES "image"("imageName") ON DELETE RESTRICT ON UPDATE CASCADE;
