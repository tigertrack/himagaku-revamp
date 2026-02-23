'use server';

import { cookies } from 'next/headers';
import { adminAuth } from '@/service/firebase/admin';

export async function createSession(idToken: string) {
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
  const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

  const cookieStore = await cookies();
  cookieStore.set('session', sessionCookie, {
    maxAge: expiresIn / 1000,
    httpOnly: true,
    secure: true,
    path: '/',
  });
}

export async function removeSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
      return null;
    }

    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true);
    return {
      uid: decodedClaims.uid,
      email: decodedClaims.email,
      displayName: decodedClaims.name || decodedClaims.email?.split('@')[0],
    };
  } catch (error) {
    return null;
  }
}
