/*
  Warnings:

  - You are about to drop the column `instructorId` on the `student` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "student" DROP CONSTRAINT "student_instructorId_fkey";

-- AlterTable
ALTER TABLE "student" DROP COLUMN "instructorId";
