import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { cookies } from 'next/headers';
import Link from 'next/link';
import {
  Bath,
  BedDouble,
  Building2,
  Hammer,
  LandPlot,
  RulerDimensionLine,
} from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import ImageWithFallback from '@/components/image-with-fallback';

import { formatAddress, formatNumber, getBathroomTooltip } from '@/lib/utils';
import { TPropertyListing } from '@/lib/types';

interface ListingsDetailPageProps {
  params: Promise<{ id: string }>;
}

const ListingsDetailPage = async ({ params }: ListingsDetailPageProps) => {
  const { id } = await params;

  // get host from request headers
  const requestHeaders = await headers();
  const host = requestHeaders.get('host');
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}`;

  const cookieStore = await cookies();

  const isAdmin = cookieStore.get('admin')?.value === 'true';

  // build API URL
  const url = new URL(`/api/v1/listings/${id}`, baseUrl);

  console.log('url: ', url);

  const response = await fetch(url.toString(), {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  if (!response.ok) {
    notFound();
  }

  const propertyListing: TPropertyListing = await response.json();

  console.log('propertyListing: ', propertyListing);

  const totalBaths = Math.ceil(parseFloat(propertyListing.bathrooms));
  const formattedBathsText = totalBaths > 1 ? 'baths' : 'bath';

  return (
    <main className="flex flex-col items-center justify-center w-full px-4 py-10 gap-8 md:px-32">
      <Link
        href={'/'}
        className="text-4xl font-bold mx-auto hover:underline hover:decoration-blue-500 text-center"
      >
        Real Estate Listings
      </Link>

      <section className="flex flex-col gap-2 justify-center md:items-center">
        <div className="w-full mx-auto flex md:items-center justify-center flex-col">
          <div className="relative">
            <ImageWithFallback
              src={propertyListing.photos}
              fallbackImageSrc={'/assets/placeholder-image.webp'}
              alt={`Property image with ${propertyListing.bedrooms} bedrooms and ${propertyListing.bathrooms} bathrooms`}
              width={650}
              height={450}
              className="rounded-lg shadow lg:w-175 lg:h-125"
            />

            <p className="absolute top-4 left-4 bg-white text-gray-800 text-xs font-bold px-3 py-1 rounded-md">
              {propertyListing.tag ? propertyListing.tag.toUpperCase() : 'RENT'}
            </p>
          </div>

          <h2 className="text-3xl font-bold mt-2 sm:mt-4 sm:text-4xl">
            ${formatNumber(propertyListing.price)}
          </h2>
        </div>

        <div className="flex justify-start items-center md:justify-center gap-2 mt-2 xl:mt-4 sm:gap-4 xl:gap-8">
          <div className="flex gap-2 items-center justify-center">
            <BedDouble size={20} className="lg:w-8 lg:h-8" />
            <span className="font-bold lg:text-xl">
              {propertyListing.bedrooms}{' '}
              <span className="font-normal">beds</span>
            </span>
          </div>

          <Tooltip>
            <TooltipTrigger className="flex gap-2 items-center justify-center">
              <Bath size={20} className="lg:w-8 lg:h-8" />
              <p className="border-b border-dotted border-gray-400 cursor-help group font-bold lg:text-xl">
                {totalBaths}{' '}
                <span className="font-normal">{formattedBathsText}</span>
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p>{getBathroomTooltip(propertyListing.bathrooms)}</p>
            </TooltipContent>
          </Tooltip>

          <div className="flex gap-2 items-center justify-center">
            <LandPlot size={20} className="lg:w-8 lg:h-8" />
            <span className="font-bold lg:text-xl">
              {formatNumber(propertyListing.livingArea)}{' '}
              <span className="font-normal">
                {propertyListing.livingAreaUnits === 'Square Feet'
                  ? 'sq ft'
                  : 'sq m'}
              </span>
            </span>
          </div>
        </div>

        <h2 className="text-gray-600 text-lg md:text-xl lg:text-2xl mt-1 xl:mt-4">
          {formatAddress(propertyListing.address)}
        </h2>

        <div className="flex items-center gap-4 sm:gap-6 flex-wrap sm:mt-2">
          <div className="flex items-center rounded-xl overflow-hidden min-w-31.25 min-h-18.75 w-38 h-20 p-3 bg-gray-200 gap-4">
            <Building2 size={32} className="xl:w-10 xl:h-10" />

            <span className="xl:text-lg">
              {propertyListing.propertyTypeDimension}
            </span>
          </div>

          <div className="flex items-center rounded-xl overflow-hidden min-w-31.25 min-h-18.75 w-38 h-20 p-3 bg-gray-200 gap-4">
            <Hammer size={32} className="xl:w-10 xl:h-10" />

            <span className="xl:text-lg">
              Built in {propertyListing.yearBuilt || '----'}
            </span>
          </div>

          <div className="flex items-center rounded-xl overflow-hidden min-w-31.25 min-h-18.75 w-38 h-20 p-3 bg-gray-200 gap-4">
            <RulerDimensionLine size={32} className="xl:w-10 xl:h-10" />

            <span className="xl:text-lg">
              {formatNumber(propertyListing.lotSize) || '--'}{' '}
              {propertyListing.livingAreaUnits === 'Square Feet'
                ? 'sq ft'
                : 'sq m'}{' '}
              lot
            </span>
          </div>
        </div>

        <section className="mt-4 xl:mt-6">
          <h2 className="font-bold text-2xl md:text-center md:text-3xl lg:text-4xl">
            What&apos;s special
          </h2>
          <p className="mt-1 md:mt-2 lg:text-xl">
            {propertyListing.description}
          </p>

          <p className="text-base md:text-lg font-semibold mt-4">
            Brokerage Partner:{' '}
            <span className="font-normal">
              {propertyListing.brokerageName || 'N/A'}
            </span>
          </p>

          {isAdmin && (
            <section className="mt-6">
              <h3 className="font-bold text-2xl md:text-center md:text-3xl lg:text-4xl">
                Internal notes
              </h3>

              <p className="text-base md:text-lg font-semibold">
                Longitude:{' '}
                <span className="font-normal">
                  {propertyListing.longitude || 'N/A'}
                </span>
              </p>

              <p className="text-base md:text-lg font-semibold">
                Latitude:{' '}
                <span className="font-normal">
                  {propertyListing.latitude || 'N/A'}
                </span>
              </p>

              <p className="text-base md:text-lg font-semibold">
                Last Sold Price:{' '}
                <span className="font-normal">
                  ${formatNumber(propertyListing.lastSoldPrice) || 'N/A'}
                </span>
              </p>

              <p className="text-base md:text-lg font-semibold">
                Listing Source:{' '}
                <span className="font-normal">
                  {propertyListing.listingDataSource || 'N/A'}
                </span>
              </p>

              <p className="text-base md:text-lg font-semibold">
                Days on Zillow:{' '}
                <span className="font-normal">
                  {formatNumber(propertyListing.daysOnZillow)} days
                </span>
              </p>

              <p className="text-base md:text-lg font-semibold">
                Original Listing Url:{' '}
                {propertyListing.url ? (
                  <Link
                    href={propertyListing.url}
                    className="font-normal hover:underline"
                    target="_blank"
                  >
                    {propertyListing.url}
                  </Link>
                ) : (
                  <span>N/A</span>
                )}
              </p>
            </section>
          )}
        </section>
      </section>
    </main>
  );
};

export default ListingsDetailPage;
