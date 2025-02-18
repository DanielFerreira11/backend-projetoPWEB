-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL,
    "instructorId" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instructor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,

    CONSTRAINT "instructor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "status" TEXT NOT NULL,
    "classId" TEXT,
    "instructorId" TEXT,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aircraft" (
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "register" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "aircraft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "class" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "instructorId" TEXT,
    "aircraftId" TEXT,
    "schedule" TEXT NOT NULL,

    CONSTRAINT "class_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_instructorId_key" ON "admin"("instructorId");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "instructor_email_key" ON "instructor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "student_email_key" ON "student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "aircraft_register_key" ON "aircraft"("register");

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "instructor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "instructor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class" ADD CONSTRAINT "class_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "instructor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class" ADD CONSTRAINT "class_aircraftId_fkey" FOREIGN KEY ("aircraftId") REFERENCES "aircraft"("id") ON DELETE CASCADE ON UPDATE CASCADE;
