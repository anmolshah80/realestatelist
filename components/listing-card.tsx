import Image from 'next/image';
import Link from 'next/link';

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
  return (
    // <div className="overflow-hidden transition-all duration-150 ease-out bg-white border rounded hover:shadow-xl hover:shadow-gray-200">
    //   <div className="relative">
    //     <div className="aspect-3/2 relative z-auto">
    //       <div style={{ width: '100%', height: '100%' }}>
    //         {/* <span
    //           style={{
    //             boxSizing: 'border-box',
    //             display: 'block',
    //             overflow: 'hidden',
    //             background: 'none',
    //             border: '0px',
    //             margin: '0px',
    //             padding: '0px',
    //             position: 'absolute',
    //             inset: '0px',
    //           }}
    //         > */}
    //         <Image
    //           alt={`property image with ${bedrooms} bedrooms and ${bathrooms} bathrooms`}
    //           src={imageSrc}
    //           width={800}
    //           height={600}
    //           className="absolute inset-0 p-0 m-auto border-none block object-cover"
    //         />
    //         {/* </span> */}
    //         <button aria-label="Zoom image" data-rmiz-btn-open="true"></button>
    //       </div>
    //     </div>
    //     <div className="absolute inset-0 pointer-events-none">
    //       <div className="px-5 py-5 bg-linear-to-t from-transparent-5 to-transparent">
    //         <span className="px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase bg-red-500 rounded-full bg-opacity-90">
    //           {listingType ? listingType.toUpperCase() : 'RENT'}
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="relative">
    //     <div className="px-5 py-5">
    //       <h3 className="text-lg font-semibold">${price}</h3>
    //       <p className="mt-1 text-sm text-gray-500">{location}</p>
    //     </div>
    //     <div className="flex text-sm border-t border-gray-100 divide-x divide-gray-200">
    //       <div className="flex items-center justify-center flex-1 px-2 py-3 text-gray-500">
    //         {bedrooms} Beds
    //       </div>
    //       <div className="flex items-center justify-center flex-1 px-2 py-3 text-gray-500">
    //         {livingArea} {livingAreaUnits === 'Square Feet' ? 'sq ft' : 'sq m'}
    //       </div>
    //       <div className="items-center justify-center flex-1 hidden px-2 py-3 text-gray-500 sm:flex">
    //         {bathrooms} Bath
    //       </div>
    //       <div className="flex items-center justify-end flex-1 h-full py-3 pr-4 text-gray-600">
    //         <button className="px-3 py-1.5 text-xs font-medium ml-3 text-cyan-500 bg-cyan-10０ rounded-full focus:outline-none">
    //           Details
    //         </button>
    //       </div>
    //     </div>
    //     <Link className="absolute inset-0" href={`/listing/${listingId}`}>
    //       <span className="sr-only">Click to open</span>
    //     </Link>
    //   </div>
    // </div>

    <div className="flex items-center justify-center flex-col">
      <Image
        src={imageSrc}
        alt={`Property image with ${bedrooms} bedrooms and ${bathrooms} bathrooms`}
        width={800}
        height={600}
      />

      <div className="flex items-center justify-center flex-col border border-t-0 border-gray-300 rounded-b-md p-4 w-full">
        <h3>${price}</h3>
        <p>{location}</p>

        <p>{bedrooms} Beds</p>
        <p>
          {livingArea} {livingAreaUnits === 'Square Feet' ? 'sq ft' : 'sq m'}
        </p>
        <p>{bathrooms} Bath</p>

        <Link href={`/listing/${listingId}`}>
          <button className="px-3 py-1.5 text-xs font-medium ml-3 text-cyan-500 bg-cyan-10０ rounded-full focus:outline-none">
            Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ListingCard;
