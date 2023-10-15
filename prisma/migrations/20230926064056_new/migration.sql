/*
  Warnings:

  - You are about to drop the `_postTotag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_postTotag" DROP CONSTRAINT "_postTotag_A_fkey";

-- DropForeignKey
ALTER TABLE "_postTotag" DROP CONSTRAINT "_postTotag_B_fkey";

-- AlterTable
ALTER TABLE "post" ADD COLUMN     "tags" TEXT[];

-- DropTable
DROP TABLE "_postTotag";

-- DropTable
DROP TABLE "tag";
