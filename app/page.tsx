import { Suspense } from 'react';

import ListingsLoading from '@/components/listings-loading';
import SearchForm from '@/components/search-form';
import ListingsContent from '@/components/listings-content';

const ListingsPage = () => {
  return (
    <main className="flex flex-col items-start justify-between w-full px-8 py-10 gap-8">
      <h1 className="text-4xl font-bold mx-auto">Real Estate Listings</h1>

      <SearchForm />

      <section className="flex flex-col">
        <h2 className="font-bold text-3xl">Featured Listings</h2>

        <Suspense fallback={<ListingsLoading />}>
          <ListingsContent />
        </Suspense>
      </section>
    </main>
  );
};

export default ListingsPage;
