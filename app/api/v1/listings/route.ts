import { NextRequest } from 'next/server';

import prisma from '@/lib/prisma';
import { MAX_RESULTS_PER_PAGE } from '@/lib/constants';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const currentPage = parseInt(searchParams.get('page') || '1');

  console.log('(api) current page: ', currentPage);

  const listings = await prisma.propertyListing.findMany({
    take: MAX_RESULTS_PER_PAGE,
    skip: (currentPage - 1) * MAX_RESULTS_PER_PAGE,
  });

  if (!listings || listings.length === 0)
    return new Response(
      JSON.stringify({ listings: [], totalRecordsCount: 0 }),
      {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      },
    );

  const totalRecordsCount = await prisma.propertyListing.count();

  return new Response(JSON.stringify({ listings, totalRecordsCount }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
