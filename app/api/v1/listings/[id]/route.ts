import { NextRequest } from 'next/server';

import prisma from '@/lib/prisma';

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'admin-secret';

// Source -> https://nextjs.org/docs/app/getting-started/route-handlers#route-context-helper
export async function GET(
  request: NextRequest,
  ctx: RouteContext<'/api/v1/listings/[id]'>,
) {
  const { id } = await ctx.params;

  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return new Response(JSON.stringify({ error: 'Invalid ID' }), {
      status: 400,
    });
  }

  const property = await prisma.propertyListing.findUnique({
    where: { id: parsedId },
  });

  console.log('property: ', property);

  if (!property) {
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
    });
  }

  // check admin header
  const adminToken = request.headers.get('x-admin-token');
  const isAdmin = adminToken === ADMIN_SECRET;

  // if not admin, remove priceHistory
  if (!isAdmin && property.priceHistory) {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const { priceHistory, ...rest } = property;

    return new Response(JSON.stringify(rest), { status: 200 });
  }

  return new Response(JSON.stringify(property), { status: 200 });
}
