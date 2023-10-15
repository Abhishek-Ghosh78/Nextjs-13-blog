/*
  Warnings:

  - A unique constraint covering the columns `[postId]` on the table `tag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tag_postId_key" ON "tag"("postId");
