import { initializeApp } from "firebase/app";
import { getAuth, getIdToken } from "firebase/auth";
import { getInstallations, getToken } from "firebase/installations";

let firebaseConfig;
let firebaseApp; // Store the initialized Firebase app

self.addEventListener('install', event => {
  const serializedFirebaseConfig = new URL(location).searchParams.get('firebaseConfig');

  if (!serializedFirebaseConfig) {
    throw new Error('Firebase Config object not found in service worker query string.');
  }

  firebaseConfig = JSON.parse(serializedFirebaseConfig);
  console.log("Service worker installed with Firebase config", firebaseConfig);

  // Initialize Firebase *once* during install
  firebaseApp = initializeApp(firebaseConfig); // Store the app instance
});

self.addEventListener("fetch", (event) => {
  const { origin } = new URL(event.request.url);
  if (origin !== self.location.origin) return;
  event.respondWith(fetchWithFirebaseHeaders(event.request));
});

async function fetchWithFirebaseHeaders(request) {
  // Use the *already initialized* app
  const auth = getAuth(firebaseApp);
  const installations = getInstallations(firebaseApp);
  const headers = new Headers(request.headers);
  const [authIdToken, installationToken] = await Promise.all([
    getAuthIdToken(auth),
    getToken(installations),
  ]);
  headers.append("Firebase-Instance-ID-Token", installationToken);
  if (authIdToken) headers.append("Authorization", `Bearer ${authIdToken}`);
  const newRequest = new Request(request, { headers });
  return await fetch(newRequest);
}

async function getAuthIdToken(auth) {
  await auth.authStateReady();
  if (!auth.currentUser) return;
  return await getIdToken(auth.currentUser);
}