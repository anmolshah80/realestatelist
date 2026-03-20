-- CreateTable
CREATE TABLE "PropertyListing" (
    "id" SERIAL NOT NULL,
    "address" TEXT,
    "bedrooms" TEXT,
    "bathrooms" TEXT,
    "price" TEXT,
    "yearBuilt" TEXT,
    "listingDataSource" TEXT,
    "longitude" TEXT,
    "latitude" TEXT,
    "livingArea" TEXT,
    "currency" TEXT NOT NULL,
    "dateSoldString" TEXT,
    "country" TEXT,
    "photoCount" TEXT,
    "livingAreaUnits" TEXT,
    "description" TEXT,
    "daysOnZillow" TEXT,
    "brokerageName" TEXT,
    "propertyTypeDimension" TEXT,
    "photos" TEXT,
    "url" TEXT,
    "isFeatured" TEXT,
    "interior" TEXT,
    "tag" TEXT,

    CONSTRAINT "PropertyListing_pkey" PRIMARY KEY ("id")
);
