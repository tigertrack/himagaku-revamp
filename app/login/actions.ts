'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/service/firebase/client'
import { createSession } from '@/app/auth/actions'

export async function login(formData: FormData) {
  try {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const idToken = await userCredential.user.getIdToken()

    await createSession(idToken)

    revalidatePath('/home', 'layout')
    redirect('/home')
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error occurred during login'
    return { success: 0, message }
  }
}