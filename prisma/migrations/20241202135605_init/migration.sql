-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "passwordHash" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);
