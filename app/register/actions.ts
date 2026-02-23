'use server'

import { adminAuth } from '@/service/firebase/admin'
import { createSession } from '@/app/auth/actions'

export async function signup(formData: FormData) {
  try {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const displayName = formData.get('displayName') as string

    // Create user with Firebase Admin SDK
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName,
    })

    // Generate a custom token for the newly created user
    const customToken = await adminAuth.createCustomToken(userRecord.uid)

    // Exchange custom token for an ID token using Firebase REST API
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=' + process.env.NEXT_PUBLIC_FIREBASE_API_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: customToken,
        returnSecureToken: true,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to create session after signup')
    }

    const data = await response.json()
    const idToken = data.idToken

    await createSession(idToken)

    return { success: 1, message: 'Account created successfully' }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error occurred during signup'
    return { success: 0, message }
  }
}