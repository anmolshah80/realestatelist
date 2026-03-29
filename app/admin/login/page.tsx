'use client';

import { SubmitEvent, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleLogin = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/v1/auth/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    // refresh to show admin content
    if (res.ok) {
      router.refresh();

      redirect('/');
    } else {
      const data = await res.json();

      setError(data.error || 'Login failed');
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-8 w-full max-w-120 items-center justify-center mx-3 sm:mx-auto sm:my-20 group rounded-lg sm:border border-solid border-gray-500 bg-transparent px-4 sm:px-8 py-6 sm:py-12 absolute inset-0 m-0 border-0 sm:static"
    >
      <h1 className="mx-auto text-4xl sm:text-5xl font-semibold">
        Welcome back
      </h1>
      <p className="text-black/80 mx-auto -mt-5 text-base sm:text-xl">
        Please enter your login details
      </p>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-black text-xl">
          Email address
        </Label>

        <Input
          type="email"
          id="email"
          name="email"
          placeholder="admin@gmail.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 w-3xs sm:w-[20rem] rounded-md border border-input py-2 pr-3 text-gray-700 shadow-sm placeholder:italic placeholder:text-gray-500 disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-50 dark:sm:text-base bg-background border-blue-500 focus-visible:ring-transparent focus-visible:ring-0"
        />

        {error && <p className="text-red-500 ml-2">{error}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password" className="text-black text-xl">
          Password
        </Label>

        <Input
          type="password"
          id="password"
          name="password"
          placeholder="admin password"
          autoComplete="current-password webauthn"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-11 w-3xs sm:w-[20rem] rounded-md border border-input py-2 pr-3 text-gray-700 shadow-sm placeholder:italic placeholder:text-gray-500 disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-50 dark:sm:text-base bg-background border-blue-500 focus-visible:ring-transparent focus-visible:ring-0"
        />
      </div>

      <Button
        type="submit"
        className="bg-blue-500 text-lg text-white px-6 py-5 rounded cursor-pointer hover:bg-blue-600"
      >
        Login
      </Button>
    </form>
  );
};

export default AdminLoginPage;
