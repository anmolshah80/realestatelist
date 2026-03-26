-- Add generated tsvector column
ALTER TABLE "PropertyListing" ADD COLUMN "searchVector" tsvector
GENERATED ALWAYS AS (
  setweight(to_tsvector('english', coalesce("propertyTypeDimension", '')), 'A') ||
  setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
  setweight(to_tsvector('english', coalesce(address, '')), 'C') ||
  setweight(to_tsvector('english', coalesce("brokerageName", '')), 'C')
) STORED;

-- Create GIN index on the generated column
CREATE INDEX "PropertyListing_searchVector_idx" ON "PropertyListing" USING GIN ("searchVector");