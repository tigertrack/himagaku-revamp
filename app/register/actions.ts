'use server'

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '@/service/firebase/client'
import { createSession } from '@/app/auth/actions'

export async function signup(formData: FormData) {
  try {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const displayName = formData.get('displayName') as string

    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    
    // Update user profile with display name
    await updateProfile(userCredential.user, { displayName })

    // Send verification email
    await userCredential.user.getIdToken()

    // Create session for automatic login after signup
    const idToken = await userCredential.user.getIdToken()
    await createSession(idToken)

    return { success: 1, message: 'Account created successfully' }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error occurred during signup'
    return { success: 0, message }
  }
}