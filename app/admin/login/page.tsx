'use client';

import { SubmitEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminLoginPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleLogin = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/v1/auth/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    // Refresh to show admin content
    if (res.ok) {
      router.refresh();
    } else {
      const data = await res.json();

      setError(data.error || 'Login failed');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/v1/auth/admin', { method: 'DELETE' });

    router.refresh();
  };

  return (
    <div className="flex justify-end p-4">
      <form onSubmit={handleLogin} className="flex gap-2">
        <input
          type="password"
          placeholder="Admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-1 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Admin Login
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="bg-gray-500 text-white px-2 py-1 rounded"
        >
          Logout
        </button>
      </form>

      {error && <p className="text-red-500 ml-2">{error}</p>}
    </div>
  );
};

export default AdminLoginPage;
