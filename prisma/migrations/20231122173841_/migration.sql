/*
  Warnings:

  - Made the column `deletedBy` on table `Course` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_deletedBy_fkey";

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "deletedBy" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
