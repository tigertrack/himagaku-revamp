'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signup } from "./actions";

const Page = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (event: React.FormEvent) => {
    setErrorMessage("");
    event.preventDefault();
    
    try {
      setisLoading(true);
      const result = await signup(new FormData(event.currentTarget as HTMLFormElement));

      if (result && !result.success) {
        setErrorMessage(result?.message || "An error occurred during signup");
        return;
      }

      // Redirect to home on successful signup
      router.push('/home');
    } catch (err) {
      console.error({err});
      setErrorMessage("An unexpected error occurred");
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <main className="p-4 flex flex-col sm:items-center md:w-5/12 lg:w-6/12 xl:w-4/12 2xl:w-3/12">
          <h1 className="text-4xl mb-2">Create new account</h1>
          <h3 className="text-2xl font-light text-gray-500 leading-loose">
            Looking forward to have you onboard!
          </h3>
          <form className="flex flex-col gap-5 mt-5 w-full" onSubmit={handleSignUp}>
            <label className="flex flex-col gap-2">
              <span className="block text-sm font-medium text-slate-200">Email</span>
              <input
                type="email"
                id="email"
                name="email"
                className="rounded py-2 px-3 bg-zinc-700 focus:outline-none focus:ring-teal-600 focus:ring-1"
                placeholder="Enter your email address"
                required
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="block text-sm font-medium text-slate-200">Display Name</span>
              <input
                type="text"
                id="displayName"
                name="displayName"
                className="rounded py-2 px-3 bg-zinc-700 focus:outline-none focus:ring-teal-600 focus:ring-1"
                placeholder="Enter your display name"
                required
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="block text-sm font-medium text-slate-200">Password</span>
              <input
                type="password"
                id="password"
                name="password"
                className="rounded py-2 px-3 bg-zinc-700 focus:outline-none focus:ring-teal-600 focus:ring-1"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="block text-sm font-medium text-slate-200">Confirm Password</span>
              <input
                type="password"
                className="rounded py-2 px-3 bg-zinc-700 focus:outline-none focus:ring-teal-600 focus:ring-1"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            <div className="flex w-full gap-2">
              <button
                type="submit"
                disabled={password !== confirmPassword || isLoading}
                className="disabled:bg-gray-400 bg-teal-600 hover:bg-teal-700 py-2 rounded-md flex items-center grow justify-center disabled:cursor-not-allowed"
              >
                {!isLoading ? 'Register' : <svg className="mr-3 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>}
              </button>
              <Link
                href="/login"
                className="text-center outline outline-1 outline-teal-600 py-2 hover:outline-none hover:bg-teal-600 rounded-md grow"
              >
                Already have an account
              </Link>
            </div>
            <div id="clerk-captcha" />
          </form>
        {errorMessage.length > 0 && <div className="bg-red-500 mt-4 px-3 py-2 rounded-md w-full">
          {errorMessage}
        </div>}
      </main>
    </div>
  );
}

export default Page;