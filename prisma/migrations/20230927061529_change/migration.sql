/*
  Warnings:

  - A unique constraint covering the columns `[postId]` on the table `tagPost` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tagId]` on the table `tagPost` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tagPost_postId_key" ON "tagPost"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "tagPost_tagId_key" ON "tagPost"("tagId");
