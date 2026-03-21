/*
  Warnings:

  - Made the column `address` on table `PropertyListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bedrooms` on table `PropertyListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bathrooms` on table `PropertyListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `PropertyListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `yearBuilt` on table `PropertyListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `listingDataSource` on table `PropertyListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `PropertyListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `latitude` on table `PropertyListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `livingArea` on table `PropertyListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateSoldString` on table `PropertyListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `PropertyListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `photoCount` on table `PropertyListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `livingAreaUnits` on table `PropertyListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `daysOnZillow` on table `PropertyListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `propertyTypeDimension` on table `PropertyListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `photos` on table `PropertyListing` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isFeatured` on table `PropertyListing` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PropertyListing" ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "bedrooms" SET NOT NULL,
ALTER COLUMN "bathrooms" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "yearBuilt" SET NOT NULL,
ALTER COLUMN "listingDataSource" SET NOT NULL,
ALTER COLUMN "longitude" SET NOT NULL,
ALTER COLUMN "latitude" SET NOT NULL,
ALTER COLUMN "livingArea" SET NOT NULL,
ALTER COLUMN "dateSoldString" SET NOT NULL,
ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "photoCount" SET NOT NULL,
ALTER COLUMN "livingAreaUnits" SET NOT NULL,
ALTER COLUMN "daysOnZillow" SET NOT NULL,
ALTER COLUMN "propertyTypeDimension" SET NOT NULL,
ALTER COLUMN "photos" SET NOT NULL,
ALTER COLUMN "isFeatured" SET NOT NULL;
