-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_deletedBy_fkey";

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "deletedBy" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
