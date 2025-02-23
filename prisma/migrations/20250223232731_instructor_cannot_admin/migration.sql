/*
  Warnings:

  - You are about to drop the column `instructorId` on the `admin` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "admin" DROP CONSTRAINT "admin_instructorId_fkey";

-- DropIndex
DROP INDEX "admin_instructorId_key";

-- AlterTable
ALTER TABLE "admin" DROP COLUMN "instructorId";
