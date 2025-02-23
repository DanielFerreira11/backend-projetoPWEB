-- DropForeignKey
ALTER TABLE "class" DROP CONSTRAINT "class_aircraftId_fkey";

-- DropForeignKey
ALTER TABLE "class" DROP CONSTRAINT "class_instructorId_fkey";

-- AddForeignKey
ALTER TABLE "class" ADD CONSTRAINT "class_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "instructor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class" ADD CONSTRAINT "class_aircraftId_fkey" FOREIGN KEY ("aircraftId") REFERENCES "aircraft"("id") ON DELETE SET NULL ON UPDATE CASCADE;
