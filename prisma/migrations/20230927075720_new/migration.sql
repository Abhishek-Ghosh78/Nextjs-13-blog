/*
  Warnings:

  - You are about to drop the column `tagId` on the `tagPost` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tagName]` on the table `tagPost` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tagName` to the `tagPost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tagPost" DROP CONSTRAINT "tagPost_tagId_fkey";

-- DropIndex
DROP INDEX "tagPost_tagId_key";

-- AlterTable
ALTER TABLE "tagPost" DROP COLUMN "tagId",
ADD COLUMN     "tagName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tagPost_tagName_key" ON "tagPost"("tagName");

-- AddForeignKey
ALTER TABLE "tagPost" ADD CONSTRAINT "tagPost_tagName_fkey" FOREIGN KEY ("tagName") REFERENCES "tag"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
