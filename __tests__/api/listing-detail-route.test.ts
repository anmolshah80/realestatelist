import { cookies } from 'next/headers';

import { GET } from '@/app/api/v1/listings/[id]/route';
import prisma from '@/lib/prisma';

type MockFindUnique = jest.Mock;

type MockPrisma = {
  propertyListing: {
    findUnique: MockFindUnique;
  };
};

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    propertyListing: {
      findUnique: jest.fn(),
    },
  },
}));

jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}));

describe('app/api/v1/listings/[id] route', () => {
  const mockCookies = cookies as jest.Mock;
  const mockFindUnique = (prisma as unknown as MockPrisma).propertyListing
    .findUnique;

  const routeContext = (id: string) => ({
    params: Promise.resolve({ id }),
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 400 when the id is invalid', async () => {
    mockCookies.mockReturnValue({
      get: jest.fn(),
    });

    const response = await GET({} as any, routeContext('abc') as any);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: 'Invalid property listing ID',
    });
    expect(mockFindUnique).not.toHaveBeenCalled();
  });

  it('returns 404 when the listing is not found for a valid id', async () => {
    mockCookies.mockReturnValue({
      get: jest.fn().mockReturnValue(undefined),
    });
    mockFindUnique.mockResolvedValue(null);

    const response = await GET({} as any, routeContext('11901') as any);

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({
      error: 'Property listing not found',
    });
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { id: 11901 },
      select: expect.any(Object),
    });
  });

  it('returns 200 and non-admin fields when there is no admin cookie', async () => {
    mockCookies.mockReturnValue({
      get: jest.fn().mockReturnValue(undefined),
    });
    mockFindUnique.mockResolvedValue({
      id: 427,
      address: '123 Main St',
      bedrooms: '3',
      bathrooms: '2',
      price: '450000',
      yearBuilt: '1990',
      livingArea: '1200',
      lotSize: '8725',
      currency: 'USD',
      country: 'USA',
      livingAreaUnits: 'Square Feet',
      description: 'A lovely home',
      brokerageName: 'Prime Realty',
      propertyTypeDimension: 'Single Family',
      photos: '/image.jpg',
      isFeatured: 'TRUE',
      interior:
        '{"bedrooms_and_bathrooms":{"bathrooms":2,"bedrooms":3,"full_bathrooms":2,"half_bathroom":"0"},"flooring":"Carpet, Laminate, Linoleum / Vinyl","heating":"Forced air, Electric, Gas","other_interior_features":"Total interior livable area :1,200 sqft"}',
      tag: 'Available',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const response = await GET({} as any, routeContext('427') as any);

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      id: 427,
      address: '123 Main St',
      brokerageName: 'Prime Realty',
    });
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { id: 427 },
      select: expect.objectContaining({
        id: true,
        address: true,
        brokerageName: true,
      }),
    });
  });

  it('returns 200 and full listing fields when admin cookie is present', async () => {
    mockCookies.mockReturnValue({
      get: jest.fn().mockReturnValue({ value: 'true' }),
    });
    mockFindUnique.mockResolvedValue({
      id: 427,
      address: '123 Main St',
      bedrooms: '3',
      bathrooms: '2',
      price: '450000',
      yearBuilt: '1990',
      listingDataSource: 'Phoenix',
      longitude: '-118.026474',
      latitude: '33.68005',
      livingArea: '1200',
      lotSize: '8725',
      currency: 'USD',
      dateSoldString: '2025-12-01',
      country: 'USA',
      livingAreaUnits: 'Square Feet',
      description: 'A lovely home',
      daysOnZillow: '719',
      brokerageName: 'Prime Realty',
      propertyTypeDimension: 'Single Family',
      photos: '/image.jpg',
      url: '',
      isFeatured: 'TRUE',
      interior:
        '{"bedrooms_and_bathrooms":{"bathrooms":2,"bedrooms":3,"full_bathrooms":2,"half_bathroom":"0"},"flooring":"Carpet, Laminate, Linoleum / Vinyl","heating":"Forced air, Electric, Gas","other_interior_features":"Total interior livable area :1,200 sqft"}',
      tag: 'Available',
      lastSoldPrice: '1475000',
      priceHistory:
        '[{"attributeSource":{"infoString2":"CRMLS","infoString3":"https://photos.zillowstatic.com/fp/9f61463932aa73f48f1ae3d056f0eb39-zillow_web_logo_inf_11.jpg"},"date":"2022-07-29","event":"Sold","postingIsRental":false,"price":1475000,"priceChangeRate":-1.601067378252168e-02,"pricePerSquareFoot":642,"showCountyLink":false,"source":"CRMLS","time":1659052800000}]',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const response = await GET({} as any, routeContext('427') as any);

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      id: 427,
      lastSoldPrice: '1475000',
      listingDataSource: 'Phoenix',
      longitude: '-118.026474',
      latitude: '33.68005',
      daysOnZillow: '719',
      url: '',
      priceHistory:
        '[{"attributeSource":{"infoString2":"CRMLS","infoString3":"https://photos.zillowstatic.com/fp/9f61463932aa73f48f1ae3d056f0eb39-zillow_web_logo_inf_11.jpg"},"date":"2022-07-29","event":"Sold","postingIsRental":false,"price":1475000,"priceChangeRate":-1.601067378252168e-02,"pricePerSquareFoot":642,"showCountyLink":false,"source":"CRMLS","time":1659052800000}]',
    });
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { id: 427 },
    });
  });
});
