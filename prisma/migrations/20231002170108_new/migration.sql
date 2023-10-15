/*
  Warnings:

  - You are about to drop the `tagPost` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[postId]` on the table `tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postId` to the `tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tagPost" DROP CONSTRAINT "tagPost_postId_fkey";

-- DropForeignKey
ALTER TABLE "tagPost" DROP CONSTRAINT "tagPost_tagName_fkey";

-- AlterTable
ALTER TABLE "tag" ADD COLUMN     "postId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "tagPost";

-- CreateIndex
CREATE UNIQUE INDEX "tag_postId_key" ON "tag"("postId");

-- AddForeignKey
ALTER TABLE "tag" ADD CONSTRAINT "tag_postId_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
