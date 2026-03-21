import prisma from '@/lib/prisma';

export async function GET() {
  const listings = await prisma.propertyListing.findMany({
    take: 6,
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
