-- AlterTable
ALTER TABLE "post" ADD COLUMN     "scheduledDate" TIMESTAMP(3),
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'draft';
