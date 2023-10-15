-- DropForeignKey
ALTER TABLE "tagPost" DROP CONSTRAINT "tagPost_tagId_fkey";

-- AlterTable
ALTER TABLE "tagPost" ALTER COLUMN "tagId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "tagPost" ADD CONSTRAINT "tagPost_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tag"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
