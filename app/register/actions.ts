'use server'

import { createClient } from '@/service/supabase/server'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
        data: {
            displayName: formData.get('displayName') as string
        }
    }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return { success: 0, message: error.message }
  }
}