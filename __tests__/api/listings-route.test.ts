import { cookies } from 'next/headers';

import { GET } from '@/app/api/v1/listings/route';
import prisma from '@/lib/prisma';

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    $queryRawUnsafe: jest.fn(),
  },
}));

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

describe('app/api/v1/listings route', () => {
  const mockCookies = cookies as jest.Mock;

  const mockQuery = (prisma as unknown as { $queryRawUnsafe: jest.Mock })
    .$queryRawUnsafe;

  const makeRequest = (search = '') =>
    ({
      url: `https://realestatelist.vercel.app/api/v1/listings${search}`,
    }) as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 404 when no listings are found', async () => {
    mockCookies.mockReturnValue({
      get: jest.fn().mockReturnValue(undefined),
    });

    mockQuery.mockResolvedValueOnce([{ count: '0' }]);
    mockQuery.mockResolvedValueOnce([]);

    const response = await GET(makeRequest());

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({
      listings: [],
      totalRecordsCount: 0,
    });
    expect(mockQuery).toHaveBeenCalledTimes(2);
  });

  it('returns 200 and applies filters for a non-admin user', async () => {
    mockCookies.mockReturnValue({
      get: jest.fn().mockReturnValue(undefined),
    });

    mockQuery.mockResolvedValueOnce([{ count: '1' }]);
    mockQuery.mockResolvedValueOnce([
      {
        id: 1,
        address: '123 Elm St',
        bedrooms: '3',
        bathrooms: '2',
        price: '350000',
      },
    ]);

    const response = await GET(
      makeRequest(
        '?page=2&limit=5&price_min=100000&price_max=500000&beds=3&baths=2.5&propertyType=Condo&keyword=beach',
      ),
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      listings: [
        {
          id: 1,
          address: '123 Elm St',
          bedrooms: '3',
          bathrooms: '2',
          price: '350000',
        },
      ],
      totalRecordsCount: 1,
    });

    const countCallArgs = mockQuery.mock.calls[0];
    expect(countCallArgs[0]).toContain(
      'SELECT COUNT(*) FROM "PropertyListing" WHERE',
    );
    expect(countCallArgs.slice(1)).toEqual([
      100000,
      500000,
      3,
      2.5,
      'Condo',
      'beach',
    ]);

    const listingsCallArgs = mockQuery.mock.calls[1];
    expect(listingsCallArgs[0]).toContain('SELECT');
    expect(listingsCallArgs[0]).toContain('FROM "PropertyListing"');
    expect(listingsCallArgs.slice(1)).toEqual([
      100000,
      500000,
      3,
      2.5,
      'Condo',
      'beach',
      5,
      5,
    ]);
  });

  it('returns 200 and uses the admin listing query when admin cookie is present', async () => {
    mockCookies.mockReturnValue({
      get: jest.fn().mockReturnValue({ value: 'true' }),
    });

    mockQuery.mockResolvedValueOnce([{ count: '2' }]);
    mockQuery.mockResolvedValueOnce([
      {
        id: 2,
        address: '456 Oak Ave',
        listingDataSource: 'MLS',
      },
    ]);

    const response = await GET(makeRequest('?page=1'));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      listings: [
        {
          id: 2,
          address: '456 Oak Ave',
          listingDataSource: 'MLS',
        },
      ],
      totalRecordsCount: 2,
    });

    const listingsSql = mockQuery.mock.calls[1][0] as string;
    expect(listingsSql).toContain('"listingDataSource"');
    expect(listingsSql).toContain('"lastSoldPrice"');
  });
});
