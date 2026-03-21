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

  // const formatImageUrl = (photos: string) => {
  //   const photosArray = JSON.parse(photos);

  //   if (photosArray.length === 0) return '/assets/placeholder-image.webp';

  //   return photosArray[0];
  // };

  return (
    <main>
      <h1>Featured Listings</h1>

      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          bathrooms={listing.bathrooms || 'N/A'}
          bedrooms={listing.bedrooms || 'N/A'}
          livingArea={listing.livingArea || 'N/A'}
          livingAreaUnits={listing.livingAreaUnits || 'Square Meters'}
          location={formatAddress(listing.address)}
          price={listing.price}
          // imageSrc={formatImageUrl(listing.photos)}
        />
      ))}
    </main>
  );
};

export default ListingsPage;
