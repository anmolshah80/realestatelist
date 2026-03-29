import Link from 'next/link';
import { cookies } from 'next/headers';
import { UserRoundKey } from 'lucide-react';

import Logout from '@/components/logout';

import { ADMIN_COOKIE_NAME } from '@/lib/constants';

const Header = async () => {
  const cookieStore = await cookies();

  const isAdminUser = cookieStore.get(ADMIN_COOKIE_NAME)?.value === 'true';

  console.log('listings page isAdminUser: ', isAdminUser);

  return (
    <div className="flex items-center justify-between w-full">
      <Link
        href={'/'}
        className="text-3xl sm:text-4xl text-black font-bold hover:underline decoration-blue-500"
      >
        Real Estate Listings
      </Link>

      {isAdminUser ? (
        <Logout />
      ) : (
        <Link
          href={'/admin/login'}
          className="text-base rounded-md text-black border-2 border-blue-700 bg-transparent hover:bg-blue-100 px-2 sm:px-6 2xl:px-8 py-2 cursor-pointer flex items-center justify-center gap-2"
        >
          <UserRoundKey size={20} />
          <span className="hidden sm:block">Admin Login</span>
        </Link>
      )}
    </div>
  );
};

export default Header;
