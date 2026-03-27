import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { FALLBACK_ADDRESS } from '@/lib/constants';

const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

const formatNumber = (value: number | string): string => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numericValue)) return '0';

  return numericValue.toLocaleString('en-US');
};

const formatAddress = (address: string) => {
  try {
    const addressObj = JSON.parse(address);

    return `${addressObj.streetAddress}, ${addressObj.city}, ${addressObj.state} ${addressObj.zipcode}`;
  } catch {
    return FALLBACK_ADDRESS;
  }
};

const getBathroomTooltip = (value: string): string => {
  const bathValue = parseFloat(value);

  if (isNaN(bathValue)) return value;

  const full = Math.floor(bathValue);

  const hasHalf = bathValue % 1 !== 0;

  const fullText = `${full} full bath${full !== 1 ? 's' : ''}`;

  const halfText = hasHalf ? ` + 1 half bath` : '';

  return fullText + halfText;
};

export { cn, formatNumber, formatAddress, getBathroomTooltip };
