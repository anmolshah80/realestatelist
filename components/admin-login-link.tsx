'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { UserRoundKey } from 'lucide-react';

const AdminLoginLink = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // build the full URL with query parameters
  const fullUrl = searchParams.toString()
    ? `${pathname}?${searchParams.toString()}`
    : pathname;

  return (
    <Link
      href={`/admin/login?redirect=${encodeURIComponent(fullUrl)}`}
      className="text-base rounded-md text-black border-2 border-blue-700 bg-transparent hover:bg-blue-100 px-2 sm:px-6 2xl:px-8 py-2 cursor-pointer flex items-center justify-center gap-2"
    >
      <UserRoundKey size={20} />
      <span className="hidden sm:block">Admin Login</span>
    </Link>
  );
};

export default AdminLoginLink;
