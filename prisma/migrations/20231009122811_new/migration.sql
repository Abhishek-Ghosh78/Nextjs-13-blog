/*
  Warnings:

  - You are about to drop the `imagePost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "imagePost" DROP CONSTRAINT "imagePost_imageName_fkey";

-- DropForeignKey
ALTER TABLE "imagePost" DROP CONSTRAINT "imagePost_postId_fkey";

-- DropTable
DROP TABLE "imagePost";

-- CreateTable
CREATE TABLE "_imageTopost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_imageTopost_AB_unique" ON "_imageTopost"("A", "B");

-- CreateIndex
CREATE INDEX "_imageTopost_B_index" ON "_imageTopost"("B");

-- AddForeignKey
ALTER TABLE "_imageTopost" ADD CONSTRAINT "_imageTopost_A_fkey" FOREIGN KEY ("A") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_imageTopost" ADD CONSTRAINT "_imageTopost_B_fkey" FOREIGN KEY ("B") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
