/*
  Warnings:

  - Added the required column `password` to the `instructor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "instructor" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "student" ADD COLUMN     "password" TEXT NOT NULL;
