import { NextRequest } from 'next/server';

import prisma from '@/lib/prisma';
import { MAX_RESULTS_PER_PAGE } from '@/lib/constants';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // pagination
  const currentPage = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(
    searchParams.get('limit') || String(MAX_RESULTS_PER_PAGE),
  );
  const offset = (currentPage - 1) * limit;

  // filters
  const priceMin = searchParams.get('price_min');
  const priceMax = searchParams.get('price_max');
  const beds = searchParams.get('beds');
  const baths = searchParams.get('baths');
  const propertyType = searchParams.get('propertyType');
  const keyword = searchParams.get('keyword');

  // build WHERE conditions
  const conditions: string[] = [];
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const params: any[] = [];
  let paramIndex = 1;

  if (priceMin !== null) {
    conditions.push(`price >= $${paramIndex++}`);
    params.push(parseInt(priceMin));
  }

  if (priceMax !== null) {
    conditions.push(`price <= $${paramIndex++}`);
    params.push(parseInt(priceMax));
  }

  if (beds !== null) {
    conditions.push(`bedrooms >= $${paramIndex++}`);
    params.push(parseInt(beds));
  }

  if (baths !== null) {
    conditions.push(`bathrooms >= $${paramIndex++}`);
    params.push(parseFloat(baths));
  }

  if (propertyType) {
    conditions.push(`"propertyTypeDimension" = $${paramIndex++}`);
    params.push(propertyType);
  }

  if (keyword) {
    conditions.push(
      `"searchVector" @@ plainto_tsquery('english', $${paramIndex++})`,
    );
    params.push(keyword);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(' AND ')}`
    : '';

  // count total records
  const countSql = `SELECT COUNT(*) FROM "PropertyListing" ${whereClause}`;
  const countResult: { count: string }[] = await prisma.$queryRawUnsafe(
    countSql,
    ...params,
  );
  const totalRecordsCount = parseInt(countResult[0].count);

  // main query – explicitly list all columns except "searchVector"
  const mainSql = `
    SELECT
      id, address, bedrooms, bathrooms, price, "yearBuilt", "listingDataSource",
      longitude, latitude, "livingArea", "lotSize", currency, "dateSoldString",
      country, "livingAreaUnits", description, "daysOnZillow", "brokerageName",
      "propertyTypeDimension", photos, url, "isFeatured", interior, tag,
      "lastSoldPrice", "priceHistory", "createdAt", "updatedAt"
    FROM "PropertyListing"
    ${whereClause}
    ORDER BY "createdAt" DESC
    OFFSET $${paramIndex++} LIMIT $${paramIndex++}
  `;

  params.push(offset, limit);

  // execute and cast result to any[] (Prisma returns any)
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const listings = (await prisma.$queryRawUnsafe(mainSql, ...params)) as any[];

  if (!listings || listings.length === 0)
    return new Response(
      JSON.stringify({ listings: [], totalRecordsCount: 0 }),
      {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      },
    );

  return new Response(JSON.stringify({ listings, totalRecordsCount }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
