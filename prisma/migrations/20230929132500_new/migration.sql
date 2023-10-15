/*
  Warnings:

  - You are about to drop the column `postId` on the `image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_postId_fkey";

-- DropIndex
DROP INDEX "image_postId_key";

-- AlterTable
ALTER TABLE "image" DROP COLUMN "postId";
