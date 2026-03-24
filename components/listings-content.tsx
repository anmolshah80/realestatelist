'use client';

import * as zod from 'zod';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import ListingCard from '@/components/listing-card';
import PaginationControls from '@/components/pagination-controls';
import ListingsLoading from '@/components/listings-loading';

import { MAX_RESULTS_PER_PAGE } from '@/lib/constants';
import { TPropertyListing } from '@/lib/types';

const pageNumberSchema = zod.coerce.number().min(1).int().positive().optional();

const ListingsContent = () => {
  const [listings, setListings] = useState<TPropertyListing[]>([]);
  const [totalRecordsCount, setTotalRecordsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();

  const page = searchParams.get('page');

  const parsedPage = pageNumberSchema.safeParse(page);

  console.log('page parsedPage: ', page, parsedPage);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `/api/v1/listings?page=${parsedPage.data || 1}`,
        );

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
  }, [parsedPage.data]);

  console.log('totalRecordsCount: ', totalRecordsCount);

  if (loading) return <ListingsLoading />;

  console.log('Listings: ', listings);

  if (!listings || listings.length === 0)
    return <p className="text-gray-600 text-2xl mt-6">No listings found.</p>;

  const formatAddress = (address: string) => {
    // address: "{\"city\":\"Huntington Beach\",\"state\":\"CA\",\"streetAddress\":\"19411 Castlewood Cir\",\"zipcode\":\"92648\"}"
    const addressObj = JSON.parse(address);

    return `${addressObj.streetAddress}, ${addressObj.city}, ${addressObj.state} ${addressObj.zipcode}`;
  };

  const totalPages = Math.ceil(totalRecordsCount / MAX_RESULTS_PER_PAGE);

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-4">
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

      <PaginationControls
        currentPage={page ? parseInt(page) : 1}
        totalPages={totalPages}
      />
    </>
  );
};

export default ListingsContent;
