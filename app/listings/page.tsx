'use client';

import { useEffect, useState } from 'react';

import ListingCard from '@/components/listing-card';

import { TPropertyListing } from '@/lib/types';

const ListingsPage = () => {
  const [listings, setListings] = useState<TPropertyListing[]>([]);
  const [totalRecordsCount, setTotalRecordsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);

      try {
        const response = await fetch(`/api/v1/listings`);

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
  }, []);

  console.log('totalRecordsCount: ', totalRecordsCount);

  if (loading)
    return (
      <main>
        <p>Loading...</p>
      </main>
    );

  if (!listings || listings.length === 0) {
    return (
      <main>
        <h1>Featured Listings</h1>
        <p>No listings found.</p>
      </main>
    );
  }

  console.log('Listings: ', listings);

  const formatAddress = (address: string) => {
    // address: "{\"city\":\"Huntington Beach\",\"state\":\"CA\",\"streetAddress\":\"19411 Castlewood Cir\",\"zipcode\":\"92648\"}"
    const addressObj = JSON.parse(address);

    return `${addressObj.streetAddress}, ${addressObj.city}, ${addressObj.state} ${addressObj.zipcode}`;
  };

  return (
    <main className="px-8 py-10">
      <h1 className="font-bold text-3xl">Featured Listings</h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-4">
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
    </main>
  );
};

export default ListingsPage;
