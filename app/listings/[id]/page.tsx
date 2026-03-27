import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
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
  searchParams: { admin?: string };
}

const ListingsDetailPage = async ({
  params,
  searchParams,
}: ListingsDetailPageProps) => {
  const { id } = await params;
  const isAdminMode = searchParams.admin === 'true';

  // get host from request headers
  const requestHeaders = await headers();
  const host = requestHeaders.get('host');
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}`;

  // build API URL
  const url = new URL(`/api/v1/listings/${id}`, baseUrl);

  console.log('url: ', url);

  // prepare fetch options
  const fetchOptions: RequestInit = {};

  if (isAdminMode) {
    fetchOptions.headers = {
      'x-admin-token': process.env.ADMIN_SECRET || 'admin-secret',
    };
  }

  const response = await fetch(url.toString(), fetchOptions);

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

          <h2 className="text-3xl font-bold mt-2 sm:mt-4 sm:text-4xl lg:text-5xl">
            ${formatNumber(propertyListing.price)}
          </h2>
        </div>

        <div className="flex justify-start items-center md:justify-center gap-2 mt-2 xl:mt-4 sm:gap-4">
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
          <div className="flex items-center rounded-xl overflow-hidden w-31.25 h-18.75 lg:w-38 lg:h-20 p-3 bg-gray-200 gap-4">
            <Building2 size={32} className="xl:w-10 xl:h-10" />

            <span className="xl:text-lg">
              {propertyListing.propertyTypeDimension}
            </span>
          </div>

          <div className="flex items-center rounded-xl overflow-hidden w-31.25 h-18.75 lg:w-38 lg:h-20 p-3 bg-gray-200 gap-4">
            <Hammer size={32} className="xl:w-10 xl:h-10" />

            <span className="xl:text-lg">
              Built in {propertyListing.yearBuilt || '----'}
            </span>
          </div>

          <div className="flex items-center rounded-xl overflow-hidden w-31.25 h-18.75 lg:w-38 lg:h-20 p-3 bg-gray-200 gap-4">
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
            Listing Source:{' '}
            <span className="font-normal">
              {propertyListing.brokerageName || 'N/A'}
            </span>
          </p>

          {isAdminMode && propertyListing.priceHistory && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
              <h3 className="font-bold">Admin Notes</h3>
              <p>{JSON.parse(propertyListing.priceHistory)}</p>
            </div>
          )}
        </section>
      </section>
    </main>
  );
};

export default ListingsDetailPage;
