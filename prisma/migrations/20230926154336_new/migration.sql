/*
  Warnings:

  - You are about to drop the `_postTotag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_postTotag" DROP CONSTRAINT "_postTotag_A_fkey";

-- DropForeignKey
ALTER TABLE "_postTotag" DROP CONSTRAINT "_postTotag_B_fkey";

-- DropTable
DROP TABLE "_postTotag";

-- CreateTable
CREATE TABLE "tagPost" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "tagPost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tagPost" ADD CONSTRAINT "tagPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tagPost" ADD CONSTRAINT "tagPost_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
