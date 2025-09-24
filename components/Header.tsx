"use client";
import React, { useState, useEffect } from "react";

import Link from "next/link";
import {
  signInWithGoogle,
  signOut,
  onAuthStateChanged,
} from "@/service/firebase/firebase";
import { useRouter } from "next/navigation";
import { firebaseConfig } from "@/service/firebase/config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Header = ({ initialUser }: { initialUser: any }) => {
  const user = null;

  const handleSignOut = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    signOut();
  };
  
  return (
    <nav className="font-bold px-4 border-b border-b-gray-600 flex justify-between items-center">
      <Link className=" px-3 py-4 cursor-pointer" href="/">
        Home
      </Link>
      {user ? (
        <div className=" px-3 py-4 group relative cursor-pointer" >
          Hi, User
          <div className="hidden group-hover:flex left-0 text-end w-full absolute flex-col bg-gray-800 rounded-md">
            <Link href="/preference" className="px-3 py-4 cursor-pointer hover:text-teal-600 hover:rounded-md">Preference</Link>
            <Link href="/history" className="px-3 py-4 cursor-pointer hover:text-teal-600 ">Quiz Histories</Link>
            <div className="px-3 py-4 cursor-pointer hover:text-teal-600 hover:rounded-md" onClick={handleSignOut}>Logout</div>
          </div>
        </div>
      ) : (
        <Link className="cursor-pointer" href={'/login'}>
          Login
        </Link>
      )}
    </nav>
  );
};

export default Header;
