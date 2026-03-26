'use client';

import { SubmitEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoaderCircle, Search, X } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { cn } from '@/lib/utils';

type TPropertyTypes = {
  propertyTypes: string[];
};

const SearchForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [priceMin, setPriceMin] = useState(searchParams.get('price_min') || '');
  const [priceMax, setPriceMax] = useState(searchParams.get('price_max') || '');
  const [beds, setBeds] = useState(searchParams.get('beds') || '');
  const [baths, setBaths] = useState(searchParams.get('baths') || '');
  const [propertyType, setPropertyType] = useState(() => {
    const type = searchParams.get('propertyType');

    return type && type !== 'all' ? type : 'all';
  });
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');

  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        const res = await fetch('/api/v1/property-types');

        const data: TPropertyTypes = await res.json();

        setPropertyTypes(data.propertyTypes || []);
      } catch (error) {
        console.error('Failed to fetch property types:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyTypes();
  }, []);

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (priceMin) params.set('price_min', priceMin);
    if (priceMax) params.set('price_max', priceMax);
    if (beds) params.set('beds', beds);
    if (baths) params.set('baths', baths);
    if (propertyType && propertyType !== 'all') {
      params.set('propertyType', propertyType);
    }
    if (keyword) params.set('keyword', keyword);

    router.push(`/?${params.toString()}`);
  };

  return (
    <form
      className="mx-auto w-full sm:w-96 md:w-xl xl:w-225 mt-8 flex items-center justify-center flex-wrap gap-6 px-4 pt-8 pb-4 bg-gray-100 rounded"
      onSubmit={handleSubmit}
    >
      <Input
        type="number"
        name="minPrice"
        placeholder="Min Price"
        value={priceMin}
        onChange={(e) => setPriceMin(e.target.value)}
        className="h-11 w-3xs rounded-md border border-input py-2 pr-3 text-gray-700 shadow-sm placeholder:italic placeholder:text-gray-500 disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-50 dark:sm:text-base bg-background border-blue-500 focus-visible:ring-transparent focus-visible:ring-0"
        min={1}
      />

      <Input
        type="number"
        name="maxPrice"
        placeholder="Max Price"
        value={priceMax}
        onChange={(e) => setPriceMax(e.target.value)}
        className="h-11 w-3xs rounded-md border border-input py-2 pr-3 text-gray-700 shadow-sm placeholder:italic placeholder:text-gray-500 disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-50 dark:sm:text-base bg-background border-blue-500 focus-visible:ring-transparent focus-visible:ring-0"
        min={1}
      />

      <Input
        type="number"
        name="totalBeds"
        placeholder="Total Beds"
        value={beds}
        onChange={(e) => setBeds(e.target.value)}
        className="h-11 w-3xs rounded-md border border-input py-2 pr-3 text-gray-700 shadow-sm placeholder:italic placeholder:text-gray-500 disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-50 dark:sm:text-base bg-background border-blue-500 focus-visible:ring-transparent focus-visible:ring-0"
        min={1}
        max={50}
      />

      <Input
        type="number"
        name="totalBaths"
        placeholder="Total Baths"
        value={baths}
        onChange={(e) => setBaths(e.target.value)}
        className="h-11 w-3xs rounded-md border border-input py-2 pr-3 text-gray-700 shadow-sm placeholder:italic placeholder:text-gray-500 disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-50 dark:sm:text-base bg-background border-blue-500 focus-visible:ring-transparent focus-visible:ring-0"
        min={1}
        max={50}
      />

      <Select
        value={propertyType}
        onValueChange={(value) => setPropertyType(value)}
        name="propertyType"
      >
        <SelectTrigger
          className="w-3xs rounded-md border border-input py-2 pr-3 text-gray-700 shadow-sm placeholder:italic placeholder:text-gray-500 disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-50 dark:sm:text-base bg-background border-blue-500 focus-visible:ring-transparent focus-visible:ring-0 flex"
          style={{ height: '2.75rem' }}
        >
          <SelectValue placeholder="Select property type" />
          {loading && (
            <LoaderCircle
              className={'text-gray-700 btn-spinner w-4 h-4 ml-auto'}
            />
          )}
        </SelectTrigger>
        <SelectContent position="popper" className="bg-gray-100">
          <SelectGroup
            className={cn({
              'my-6 flex items-center justify-center min-h-20 w-full': loading,
            })}
          >
            {loading ? (
              <LoaderCircle className={'text-gray-700 btn-spinner w-12 h-12'} />
            ) : (
              <>
                <SelectItem
                  value={'all'}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  All types
                </SelectItem>
                {propertyTypes.map((type) => (
                  <SelectItem
                    key={type}
                    value={type}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    {type}
                  </SelectItem>
                ))}
              </>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Label className="relative block w-3xs">
        <span className="absolute inset-y-0 left-2 flex items-center pl-3">
          <Search className="h-5 w-5 text-black/70" />
        </span>

        <span className="sr-only">Search</span>

        <Input
          type="text"
          name="search"
          placeholder="Search for listings..."
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          maxLength={150}
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          className="block h-11 rounded-md border border-input py-2 pl-13 pr-3 text-gray-700 shadow-sm placeholder:italic placeholder:text-gray-500 disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-50 dark:sm:text-base bg-background border-blue-500 focus-visible:ring-transparent focus-visible:ring-0"
        />

        <span
          className={cn(
            'group absolute inset-y-0 right-3 flex cursor-pointer items-center pr-2',
            {
              hidden: keyword === '',
            },
          )}
          onClick={() => setKeyword('')}
        >
          <X className="h-6 w-6 text-black/70 group-hover:text-black" />
        </span>
      </Label>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-500 mt-auto"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
