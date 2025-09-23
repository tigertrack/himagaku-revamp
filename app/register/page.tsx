import React from 'react'
import Link from 'next/link';
const page = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <main className="p-4 flex flex-col sm:items-center">
        <h1 className="text-4xl mb-2">Create new account</h1>
        <h3 className="text-2xl font-light text-gray-500 leading-loose">
          Looking forward to have you onboard!
        </h3>
        <form className="flex flex-col gap-5 mt-5 w-full">
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
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="block text-sm font-medium text-slate-200">
              Confirm Password
            </span>
            <input
              type="password"
              className="rounded py-2 px-3 bg-zinc-700 focus:outline-none  focus:ring-teal-400 focus:ring-1"
              placeholder="Confirm your password"
            />
          </label>
          {/* <label htmlFor="" className="flex gap-2 items-center">
            <input type="checkbox" className="default:ring-2 accent-sky-500" />
            <span className="block text-sm font-medium text-slate-200">
              Send me news & invites for experimental features.
            </span>
          </label> */}
          <div className="flex w-full gap-2">
            <button
              className="bg-teal-700 hover:bg-teal-700 py-2 rounded-md grow disabled:cursor-not-allowed"
            >
              Register
            </button>
            <Link
              href="/login"
              className="text-center outline outline-teal-700 py-2 hover:outline-none hover:bg-teal-700 rounded-md grow"
            >
              Already have an account
            </Link>
          </div>
        </form>
      </main>
    </div>
  )
}

export default page