'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createSession } from '@/app/auth/actions'

export async function login(formData: FormData) {
  try {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Use Firebase REST API for authentication
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.NEXT_PUBLIC_FIREBASE_API_KEY, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || 'Login failed')
    }

    const data = await response.json()
    const idToken = data.idToken

    await createSession(idToken)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error occurred during login'
    return { success: 0, message }
  }

  revalidatePath('/home', 'layout')
  redirect('/home')
}