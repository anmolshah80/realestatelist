// import Image from 'next/image';
import Link from 'next/link';

type ListingCardProps = {
  // imageSrc: string;
  location: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  livingArea: string;
  livingAreaUnits: string;
};

const ListingCard = ({
  // imageSrc,
  location,
  price,
  bedrooms,
  bathrooms,
  livingArea,
  livingAreaUnits,
}: ListingCardProps) => {
  return (
    <div>
      {/* <Image
        src={imageSrc}
        alt={`property image with ${bedrooms} bedrooms and ${bathrooms} bathrooms`}
      /> */}
      <p>{location}</p>
      <p>${price}</p>
      <p>{bedrooms} bedrooms</p>
      <p>{bathrooms} bathrooms</p>
      <p>
        {livingArea} {livingAreaUnits === 'Square Feet' ? 'sq ft' : 'sq m'}
      </p>
      <Link href="#">Details</Link>
    </div>
  );
};

export default ListingCard;
