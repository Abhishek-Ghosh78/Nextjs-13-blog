/*
  Warnings:

  - You are about to drop the column `tagName` on the `tagPost` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tagId]` on the table `tagPost` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tagId` to the `tagPost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tagPost" DROP CONSTRAINT "tagPost_tagName_fkey";

-- DropIndex
DROP INDEX "tagPost_tagName_key";

-- AlterTable
ALTER TABLE "tagPost" DROP COLUMN "tagName",
ADD COLUMN     "tagId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tagPost_tagId_key" ON "tagPost"("tagId");

-- AddForeignKey
ALTER TABLE "tagPost" ADD CONSTRAINT "tagPost_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
