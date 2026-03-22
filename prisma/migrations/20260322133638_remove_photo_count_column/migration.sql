/*
  Warnings:

  - You are about to drop the column `photoCount` on the `PropertyListing` table. All the data in the column will be lost.
  - Made the column `description` on table `PropertyListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `brokerageName` on table `PropertyListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `interior` on table `PropertyListing` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PropertyListing" DROP COLUMN "photoCount",
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "brokerageName" SET NOT NULL,
ALTER COLUMN "interior" SET NOT NULL;
