'use client';

import * as zod from 'zod';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import ListingCard from '@/components/listing-card';
import PaginationControls from '@/components/pagination-controls';
import ListingsLoading from '@/components/listings-loading';

import { MAX_RESULTS_PER_PAGE } from '@/lib/constants';
import { cn, formatAddress } from '@/lib/utils';
import { TPropertyListing } from '@/lib/types';

const pageNumberSchema = zod.coerce.number().min(1).int().positive().optional();

const ListingsContent = () => {
  const [listings, setListings] = useState<TPropertyListing[]>([]);
  const [totalRecordsCount, setTotalRecordsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();

  // get all filter values from URL
  const page = searchParams.get('page');
  const priceMin = searchParams.get('price_min');
  const priceMax = searchParams.get('price_max');
  const beds = searchParams.get('beds');
  const baths = searchParams.get('baths');
  const propertyType = searchParams.get('propertyType');
  const keyword = searchParams.get('keyword');

  const parsedPage = pageNumberSchema.safeParse(page);
  const currentPage = parsedPage.data || 1;

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);

      try {
        // build query string with all filters
        const params = new URLSearchParams();

        params.set('page', String(currentPage));

        if (priceMin) params.set('price_min', priceMin);
        if (priceMax) params.set('price_max', priceMax);
        if (beds) params.set('beds', beds);
        if (baths) params.set('baths', baths);
        if (propertyType) params.set('propertyType', propertyType);
        if (keyword) params.set('keyword', keyword);

        const response = await fetch(`/api/v1/listings?${params.toString()}`);

        const { listings, totalRecordsCount } = await response.json();

        setListings(listings);
        setTotalRecordsCount(totalRecordsCount);
      } catch (error) {
        console.error('Error fetching listings: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [currentPage, priceMin, priceMax, beds, baths, propertyType, keyword]);

  if (loading)
    return <ListingsLoading className="top-[50%] md:top-[80%] xl:top-[70%]" />;

  if (!listings || listings.length === 0)
    return <p className="text-gray-600 text-2xl mt-6">No listings found.</p>;

  const totalPages = Math.ceil(totalRecordsCount / MAX_RESULTS_PER_PAGE);

  return (
    <>
      <div
        className={cn('grid gap-8 mt-4', {
          'md:grid-cols-2': totalRecordsCount > 1,
          'lg:grid-cols-3': totalRecordsCount >= 3,
        })}
      >
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            listingId={listing.id}
            bathrooms={listing.bathrooms}
            bedrooms={listing.bedrooms}
            livingArea={listing.livingArea}
            livingAreaUnits={listing.livingAreaUnits}
            location={formatAddress(listing.address)}
            price={listing.price}
            imageSrc={listing.photos}
            listingType={listing.tag}
          />
        ))}
      </div>

      <PaginationControls currentPage={currentPage} totalPages={totalPages} />
    </>
  );
};

export default ListingsContent;
