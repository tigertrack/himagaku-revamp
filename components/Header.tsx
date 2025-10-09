"use client";

import { createClient } from "@/service/supabase/client";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";

const Header = () => {
 
  const [user, setUser] = useState<string | undefined>()
  const [isFetchingUser, setIsFetchingUser] = useState(false)
  const supabase = createClient();
  const route = useRouter();

  useEffect(() => {
    async function getUser() {
      try {
        setIsFetchingUser(true)
        const { data: { user } } = await supabase.auth.getUser()
        const metadata = user?.user_metadata
        setUser(metadata?.displayName)
      } catch (error) {
        console.log("error fetching user: ", error)
      } finally {
        setIsFetchingUser(false)
      }
    }
    getUser()
  }, [supabase.auth])

  const signOut = async () => {
  await supabase.auth.signOut();
  route.push('/login')
}



  const handleSignOut = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    signOut();
  };
  
  return (
    <nav className="font-bold px-4 border-b border-b-gray-600 flex justify-between items-center">
      <Link className=" px-3 py-4 cursor-pointer" href="/home">
        Home
      </Link>
      {isFetchingUser ? 
        <div
          className="bg-slate-800 hover:cursor-pointer px-3 py-1 rounded-xl animate-pulse h-5 w-20"
        ></div> : user ? (
        <div className=" px-3 py-4 group relative cursor-pointer" >
          Hi, {user}
          <div className="hidden group-hover:flex right-0 text-end w-40 absolute flex-col bg-gray-800 rounded-md">
            <Link href="/home" className="px-3 py-4 cursor-pointer hover:text-teal-600 hover:rounded-md">Home</Link>
            <Link href="/translate" className="px-3 py-4 cursor-pointer hover:text-teal-600 ">Translation Tool</Link>
            <div className="px-3 py-4 cursor-pointer hover:text-teal-600 hover:rounded-md" onClick={handleSignOut}>Sign Out</div>
          </div>
        </div>
      ) : (
        <div className="flex gap-3">
          <Link className="cursor-pointer" href={'/login'}>
          Login
          </Link>| 
          <Link className="cursor-pointer" href={'/register'}>
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
