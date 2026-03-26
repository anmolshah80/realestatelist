import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // fetch distinct `propertyTypeDimension` values, ordered alphabetically
    const result = await prisma.$queryRaw<{ propertyTypeDimension: string }[]>`
      SELECT DISTINCT "propertyTypeDimension"
      FROM "PropertyListing"
      WHERE "propertyTypeDimension" IS NOT NULL
      ORDER BY "propertyTypeDimension" ASC
    `;

    const types = result.map((row) => row.propertyTypeDimension);

    return NextResponse.json({ propertyTypes: types });
  } catch (error) {
    console.error('Error fetching property types:', error);

    return NextResponse.json(
      { error: 'Failed to fetch property types' },
      { status: 500 },
    );
  }
}
