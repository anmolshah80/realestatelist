import { LoaderCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

interface ListingLoadingProps {
  className?: string;
}

const ListingsLoading = ({ className }: ListingLoadingProps) => (
  <LoaderCircle className={cn('text-gray-700 spinner top-[50%]', className)} />
);

export default ListingsLoading;
