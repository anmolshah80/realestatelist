import { Suspense } from 'react';

import ListingsLoading from '@/components/listings-loading';
import SearchForm from '@/components/search-form';
import ListingsContent from '@/components/listings-content';
import Header from '@/components/header';

const ListingsPage = async () => {
  return (
    <main className="flex flex-col items-center justify-between w-full px-8 py-10 gap-8">
      <Header />

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
