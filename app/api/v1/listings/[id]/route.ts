import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

import prisma from '@/lib/prisma';
import { TPropertyListing } from '@/lib/types';
import { ADMIN_COOKIE_NAME } from '@/lib/constants';

// Source -> https://nextjs.org/docs/app/getting-started/route-handlers#route-context-helper
export async function GET(
  _request: NextRequest,
  ctx: RouteContext<'/api/v1/listings/[id]'>,
) {
  const { id } = await ctx.params;

  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return new Response(JSON.stringify({ error: 'Invalid ID' }), {
      status: 400,
    });
  }

  let propertyListing: Partial<TPropertyListing> | null;

  // check admin cookie
  const cookieStore = await cookies();

  const isAdmin = cookieStore.get(ADMIN_COOKIE_NAME)?.value === 'true';

  console.log('(listing-id) route isAdmin: ', isAdmin);

  // If there is no admin, select non-admin fields
  if (!isAdmin) {
    propertyListing = await prisma.propertyListing.findUnique({
      where: { id: parsedId },
      select: {
        id: true,
        address: true,
        bedrooms: true,
        bathrooms: true,
        price: true,
        yearBuilt: true,
        livingArea: true,
        lotSize: true,
        currency: true,
        country: true,
        livingAreaUnits: true,
        description: true,
        brokerageName: true,
        propertyTypeDimension: true,
        photos: true,
        isFeatured: true,
        interior: true,
        tag: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  } else {
    propertyListing = await prisma.propertyListing.findUnique({
      where: { id: parsedId },
    });
  }

  console.log('propertyListing: ', propertyListing);

  if (!propertyListing) {
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(propertyListing), { status: 200 });
}
