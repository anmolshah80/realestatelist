import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

const formatNumber = (value: number | string): string => {
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numericValue)) return '0';

  return numericValue.toLocaleString('en-US');
};

export { cn, formatNumber };
