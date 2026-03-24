/*
  Warnings:

  - Added the required column `lastSoldPrice` to the `PropertyListing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lotSize` to the `PropertyListing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceHistory` to the `PropertyListing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PropertyListing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PropertyListing" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lastSoldPrice" TEXT NOT NULL,
ADD COLUMN     "lotSize" TEXT NOT NULL,
ADD COLUMN     "priceHistory" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "PropertyListing_price_idx" ON "PropertyListing"("price");

-- CreateIndex
CREATE INDEX "PropertyListing_propertyTypeDimension_idx" ON "PropertyListing"("propertyTypeDimension");

-- CreateIndex
CREATE INDEX "PropertyListing_brokerageName_idx" ON "PropertyListing"("brokerageName");

-- CreateIndex
CREATE INDEX "PropertyListing_tag_idx" ON "PropertyListing"("tag");
