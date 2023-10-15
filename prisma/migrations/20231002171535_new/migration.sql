/*
  Warnings:

  - You are about to drop the column `name` on the `tag` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tagName]` on the table `tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tagName` to the `tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "tag_name_key";

-- AlterTable
ALTER TABLE "tag" DROP COLUMN "name",
ADD COLUMN     "tagName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tag_tagName_key" ON "tag"("tagName");
