import Image from 'next/image';
import Link from 'next/link';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { formatNumber } from '@/lib/utils';

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
  const getBathroomTooltip = (value: string): string => {
    const bathValue = parseFloat(value);
    if (isNaN(bathValue)) return value;

    const full = Math.floor(bathValue);

    const hasHalf = bathValue % 1 !== 0;
    const fullText = `${full} full bath${full !== 1 ? 's' : ''}`;
    const halfText = hasHalf ? ` + 1 half baths` : '';

    return fullText + halfText;
  };

  return (
    <Link
      href={`/listing/${listingId}`}
      className="flex flex-col h-full transition-all duration-150 ease-out hover:shadow-xl hover:shadow-gray-200"
    >
      <div className="relative h-96 md:h-72 w-full overflow-hidden rounded-t-md">
        <Image
          src={imageSrc}
          alt={`Property image with ${bedrooms} bedrooms and ${bathrooms} bathrooms`}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col px-6 py-8 md:p-4 flex-1 border border-gray-300 border-t-0 rounded-b-md gap-2 md:gap-0">
        <h3 className="text-2xl font-semibold">${formatNumber(price)}</h3>
        <p className="text-gray-600 text-xl md:text-lg mt-1">{location}</p>

        <div className="flex items-center justify-between gap-2 mt-4 text-gray-700 text-base">
          <p>{bedrooms} Beds</p>
          <p>
            {formatNumber(livingArea)}{' '}
            {livingAreaUnits === 'Square Feet' ? 'sq ft' : 'sq m'}
          </p>

          <Tooltip>
            <TooltipTrigger>
              <p className="border-b border-dotted border-gray-400 cursor-help group">
                {Math.ceil(parseFloat(bathrooms))} Baths
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
