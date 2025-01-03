/*
  Warnings:

  - You are about to drop the `OrderItems` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cartId` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "cartId" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL;

-- DropTable
DROP TABLE "OrderItems";
