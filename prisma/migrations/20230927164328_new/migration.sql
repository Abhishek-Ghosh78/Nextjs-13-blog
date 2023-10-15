/*
  Warnings:

  - You are about to drop the `comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tagPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "tagPost" DROP CONSTRAINT "tagPost_postId_fkey";

-- DropForeignKey
ALTER TABLE "tagPost" DROP CONSTRAINT "tagPost_tagName_fkey";

-- DropTable
DROP TABLE "comment";

-- DropTable
DROP TABLE "tagPost";

-- CreateTable
CREATE TABLE "_postTotag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_postTotag_AB_unique" ON "_postTotag"("A", "B");

-- CreateIndex
CREATE INDEX "_postTotag_B_index" ON "_postTotag"("B");

-- AddForeignKey
ALTER TABLE "_postTotag" ADD CONSTRAINT "_postTotag_A_fkey" FOREIGN KEY ("A") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_postTotag" ADD CONSTRAINT "_postTotag_B_fkey" FOREIGN KEY ("B") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
