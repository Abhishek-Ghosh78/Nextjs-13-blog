/*
  Warnings:

  - You are about to drop the column `postId` on the `tag` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tagName]` on the table `post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tagName` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tag" DROP CONSTRAINT "tag_postId_fkey";

-- DropIndex
DROP INDEX "tag_postId_key";

-- AlterTable
ALTER TABLE "post" ADD COLUMN     "tagName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tag" DROP COLUMN "postId";

-- CreateIndex
CREATE UNIQUE INDEX "post_tagName_key" ON "post"("tagName");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_tagName_fkey" FOREIGN KEY ("tagName") REFERENCES "tag"("tagName") ON DELETE RESTRICT ON UPDATE CASCADE;
