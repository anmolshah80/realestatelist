import { Suspense } from 'react';
import Link from 'next/link';

import ListingsLoading from '@/components/listings-loading';
import SearchForm from '@/components/search-form';
import ListingsContent from '@/components/listings-content';

const ListingsPage = () => {
  return (
    <main className="flex flex-col items-center justify-between w-full px-8 py-10 gap-8">
      <Link
        href={'/'}
        className="text-4xl font-bold mx-auto hover:underline hover:decoration-blue-500"
      >
        Real Estate Listings
      </Link>

      <SearchForm />

      <section className="flex flex-col mt-2">
        <h2 className="font-semibold text-3xl mx-auto">Featured Listings</h2>

        <Suspense
          fallback={
            <ListingsLoading className="top-[50%] md:top-[80%] xl:top-[70%]" />
          }
        >
          <ListingsContent />
        </Suspense>
      </section>
    </main>
  );
};

export default ListingsPage;
