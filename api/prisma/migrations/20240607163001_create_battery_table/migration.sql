-- CreateEnum
CREATE TYPE "BatteryStatus" AS ENUM ('Empty', 'Charged', 'Full');

-- CreateTable
CREATE TABLE "Battery" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "totalCapacity" DOUBLE PRECISION NOT NULL DEFAULT 4,
    "charge" DOUBLE PRECISION NOT NULL DEFAULT 4,
    "emptyCount" INTEGER NOT NULL DEFAULT 0,
    "status" "BatteryStatus" NOT NULL DEFAULT 'Full',

    CONSTRAINT "Battery_pkey" PRIMARY KEY ("id")
);
