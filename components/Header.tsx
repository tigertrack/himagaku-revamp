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
function useUserSession(initialUser: any) {
  // The initialUser comes from the server via a server component
  const [user, setUser] = useState(initialUser);
  const router = useRouter();

  // Register the service worker that sends auth state back to server
  // The service worker is built with npm run build-service-worker
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const serializedFirebaseConfig = encodeURIComponent(
        JSON.stringify(firebaseConfig)
      );
      const serviceWorkerUrl = `/auth-service-worker.js?firebaseConfig=${serializedFirebaseConfig}`;

      navigator.serviceWorker
        .register(serviceWorkerUrl)
        .then((registration) => console.log("scope is: ", registration.scope));
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const unsubscribe = onAuthStateChanged((authUser: any) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onAuthStateChanged((authUser: any) => {
      if (user === undefined) return;

      // refresh when user changed to ease testing
      if (user?.email !== authUser?.email) {
        router.refresh();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return user;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Header = ({ initialUser }: { initialUser: any }) => {
  const user = useUserSession(initialUser);

  const handleSignOut = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    signOut();
  };

  const handleSignIn = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    signInWithGoogle();
  };
  return (
    <nav className="font-bold px-4 border-b border-b-gray-600 flex justify-between items-center">
      <Link className=" px-3 py-4 cursor-pointer" href="/">
        Home
      </Link>
      {user ? (
        <div className=" px-3 py-4 group relative cursor-pointer" >
          Hi, {user.displayName}
          <div className="hidden group-hover:flex left-0 text-end w-full absolute flex-col bg-gray-800 rounded-md">
            <Link href="/preference" className="px-3 py-4 cursor-pointer hover:text-teal-600 hover:rounded-md">Preference</Link>
            <Link href="/history" className="px-3 py-4 cursor-pointer hover:text-teal-600 ">Quiz Histories</Link>
            <div className="px-3 py-4 cursor-pointer hover:text-teal-600 hover:rounded-md" onClick={handleSignOut}>Logout</div>
          </div>
        </div>
      ) : (
        <div className="cursor-pointer" onClick={handleSignIn}>
          Login
        </div>
      )}
    </nav>
  );
};

export default Header;
