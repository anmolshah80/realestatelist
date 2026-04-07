import Link from 'next/link';
import { cookies } from 'next/headers';

import Logout from '@/components/logout';
import AdminLoginLink from '@/components/admin-login-link';

import { ADMIN_COOKIE_NAME } from '@/lib/constants';

const Header = async () => {
  const cookieStore = await cookies();

  const isAdminUser = cookieStore.get(ADMIN_COOKIE_NAME)?.value === 'true';

  return (
    <div className="flex items-center justify-between w-full">
      <Link
        href={'/'}
        className="text-3xl sm:text-4xl text-black font-bold hover:underline decoration-blue-500"
      >
        Real Estate Listings
      </Link>

      {isAdminUser ? <Logout /> : <AdminLoginLink />}
    </div>
  );
};

export default Header;
