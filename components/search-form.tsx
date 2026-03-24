import { useState } from 'react';
import { Search, X } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { cn } from '@/lib/utils';

const SearchForm = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <form className="mx-auto w-3xs md:w-xl mt-8">
      <Label className="relative block">
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
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          // disabled={error !== null}
          className="block h-11 w-full rounded-md border border-input py-2 pl-13 pr-3 text-gray-700 shadow-sm placeholder:italic placeholder:text-gray-500 disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-50 dark:sm:text-base bg-background border-blue-500 focus-visible:ring-transparent focus-visible:ring-0"
        />

        <span
          className={cn(
            'group absolute inset-y-0 right-3 flex cursor-pointer items-center pr-2',
            {
              hidden: searchText === '',
            },
          )}
          onClick={() => setSearchText('')}
        >
          <X className="h-6 w-6 text-black/70 group-hover:text-black" />
        </span>
      </Label>
    </form>
  );
};

export default SearchForm;
