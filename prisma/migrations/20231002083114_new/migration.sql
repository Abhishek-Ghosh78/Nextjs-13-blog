/*
  Warnings:

  - A unique constraint covering the columns `[imageName]` on the table `image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imageName]` on the table `post` will be added. If there are existing duplicate values, this will fail.
  - Made the column `imageName` on table `image` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `imageName` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "image" ALTER COLUMN "imageName" SET NOT NULL;

-- AlterTable
ALTER TABLE "post" ADD COLUMN     "imageName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "image_imageName_key" ON "image"("imageName");

-- CreateIndex
CREATE UNIQUE INDEX "post_imageName_key" ON "post"("imageName");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_imageName_fkey" FOREIGN KEY ("imageName") REFERENCES "image"("imageName") ON DELETE RESTRICT ON UPDATE CASCADE;
