import Link from 'next/link';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import ImageWithFallback from '@/components/image-with-fallback';

import { formatNumber, getBathroomTooltip } from '@/lib/utils';

type ListingCardProps = {
  listingId: number;
  imageSrc: string;
  location: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  livingArea: string;
  livingAreaUnits: string;
  listingType: string | null;
};

const ListingCard = ({
  listingId,
  imageSrc,
  location,
  price,
  bedrooms,
  bathrooms,
  livingArea,
  livingAreaUnits,
  listingType,
}: ListingCardProps) => {
  const totalBaths = Math.ceil(parseFloat(bathrooms));

  const formatText = (count: number, units: string = 'baths') => {
    return count > 1 ? `${count} ${units}` : `${count} ${units.slice(0, -1)}`;
  };

  return (
    <Link
      href={`/listings/${listingId}`}
      className="flex flex-col h-full transition-all duration-150 ease-out hover:shadow-xl hover:shadow-gray-200"
    >
      <div className="relative h-72 sm:h-80 md:h-72 w-full overflow-hidden rounded-t-md">
        <ImageWithFallback
          src={imageSrc}
          fallbackImageSrc={'/assets/placeholder-image.webp'}
          alt={`Property image with ${bedrooms} bedrooms and ${bathrooms} bathrooms`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <p className="absolute top-4 left-4 bg-white text-gray-800 text-xs font-bold px-3 py-1 rounded-md">
          {listingType ? listingType.toUpperCase() : 'RENT'}
        </p>
      </div>

      <div className="flex flex-col px-6 py-8 md:p-4 flex-1 border border-gray-300 border-t-0 rounded-b-md gap-2 md:gap-0">
        <h3 className="text-2xl font-semibold">${formatNumber(price)}</h3>
        <p className="text-gray-600 text-xl md:text-lg mt-1">{location}</p>

        <div className="flex items-center justify-between gap-2 mt-4 text-gray-700 text-base">
          <p>{formatText(parseInt(bedrooms), 'beds')}</p>
          <p>
            {formatNumber(livingArea)}{' '}
            {livingAreaUnits === 'Square Feet' ? 'sq ft' : 'sq m'}
          </p>

          <Tooltip>
            <TooltipTrigger>
              <p className="border-b border-dotted border-gray-400 cursor-help group">
                {formatText(totalBaths, 'baths')}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p>{getBathroomTooltip(bathrooms)}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
