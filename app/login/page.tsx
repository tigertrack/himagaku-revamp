export default function LoginPage() {
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
              className="rounded py-2 px-3 bg-zinc-700 focus:outline-none  focus:ring-sky-400 focus:ring-1"
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
              className="rounded py-2 px-3 bg-zinc-700 focus:outline-none  focus:ring-sky-400 focus:ring-1"
              placeholder="Enter your password"
            />
          </label>
          <label htmlFor="" className="flex gap-2 items-center">
            <input type="checkbox" className="default:ring-2 accent-sky-500" />
            <span className="block text-sm font-medium text-slate-200">
              Remember me
            </span>
          </label>
          <div className="flex w-full gap-2">
            <button
              className="bg-sky-700 hover:bg-sky-800 py-2 rounded-md grow"
            >
              Login
            </button>
            
          </div>
        </form>
      </main>
    </div>
  )
}