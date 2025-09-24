"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      router.push('/home');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <main className="p-4 flex flex-col sm:items-center">
        <h1 className="text-4xl mb-2">Let&apos;s sign you in</h1>
        <h3 className="text-2xl font-light text-gray-500 leading-loose">
          Welcome back, you&apos;ve been missed!
        </h3>
        <form
          className="flex flex-col gap-5 mt-5 w-full"
        >
          <label className="flex flex-col gap-2">
            <span className="block text-sm font-medium text-slate-200">
              Email
            </span>
            <input
              type="email"
              id="email"
              name="email"
              className="rounded py-2 px-3 bg-zinc-700 focus:outline-none  focus:ring-teal-400 focus:ring-1"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="block text-sm font-medium text-slate-200">
              Password
            </span>
            <input
              type="password"
              id="password"
              name="password"
              className="rounded py-2 px-3 bg-zinc-700 focus:outline-none  focus:ring-teal-400 focus:ring-1"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="flex w-full gap-2">
            <button
              className="bg-teal-700 hover:bg-teal-800 py-2 rounded-md grow"
              onClick={handleSubmit}
            >
              Login
            </button>
            
          </div>
        </form>
      </main>
    </div>
  )
}