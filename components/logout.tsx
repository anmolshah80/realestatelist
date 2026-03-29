'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/v1/auth/admin', { method: 'DELETE' });

    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="text-base rounded-md text-black border-2 border-gray-700 bg-transparent hover:bg-gray-100 px-2 sm:px-6 2xl:px-8 py-2 cursor-pointer flex items-center justify-center gap-2"
    >
      <LogOut size={20} />
      <span className="hidden sm:block">Logout</span>
    </button>
  );
};

export default Logout;
