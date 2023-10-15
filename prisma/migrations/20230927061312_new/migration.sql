/*
  Warnings:

  - You are about to drop the column `tagName` on the `tagPost` table. All the data in the column will be lost.
  - Added the required column `tagId` to the `tagPost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tagPost" DROP CONSTRAINT "tagPost_tagName_fkey";

-- AlterTable
ALTER TABLE "tagPost" DROP COLUMN "tagName",
ADD COLUMN     "tagId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tagPost" ADD CONSTRAINT "tagPost_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
