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
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tagPost" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "tagName" TEXT NOT NULL,

    CONSTRAINT "tagPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tagPost_postId_key" ON "tagPost"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "tagPost_tagName_key" ON "tagPost"("tagName");

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tagPost" ADD CONSTRAINT "tagPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tagPost" ADD CONSTRAINT "tagPost_tagName_fkey" FOREIGN KEY ("tagName") REFERENCES "tag"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
