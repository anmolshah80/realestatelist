import { GET } from '@/app/api/v1/property-types/route';
import prisma from '@/lib/prisma';

type MockPrisma = {
  $queryRaw: jest.Mock;
};

jest.mock('@/lib/prisma', () => {
  return {
    __esModule: true,
    default: {
      $queryRaw: jest.fn(),
    },
  };
});

describe('GET /api/v1/property-types', () => {
  it('returns sorted unique property types', async () => {
    const mockPrisma = prisma as unknown as MockPrisma;

    mockPrisma.$queryRaw.mockResolvedValue([
      { propertyTypeDimension: 'Apartment' },
      { propertyTypeDimension: 'Condo' },
      { propertyTypeDimension: 'Single Family' },
      { propertyTypeDimension: 'Multi Family' },
      { propertyTypeDimension: 'Manufactured' },
      { propertyTypeDimension: 'Townhouse' },
    ]);

    const response = await GET();

    expect(response.status).toBe(200);

    const body = await response.json();

    expect(body).toEqual({
      propertyTypes: [
        'Apartment',
        'Condo',
        'Single Family',
        'Multi Family',
        'Manufactured',
        'Townhouse',
      ],
    });

    expect(mockPrisma.$queryRaw).toHaveBeenCalled();
  });

  it('returns 500 if database query fails', async () => {
    const mockPrisma = prisma as unknown as MockPrisma;

    mockPrisma.$queryRaw.mockRejectedValue(new Error('Database error'));

    // suppress console.error during this test since we're testing error handling
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const response = await GET();

    expect(response.status).toBe(500);

    const body = await response.json();

    expect(body).toEqual({ error: 'Failed to fetch property types' });

    expect(mockPrisma.$queryRaw).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
