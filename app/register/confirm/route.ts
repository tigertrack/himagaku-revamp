import { type NextRequest } from 'next/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  // Firebase handles email verification through a link sent to the user
  // This endpoint is for handling the verification email callback
  // Firebase will automatically verify the email when the user clicks the link in the email
  
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get('mode')
  const code = searchParams.get('code')

  if (mode === 'verifyEmail' && code) {
    // Firebase email verification is handled automatically
    // The user will be redirected here after clicking the email verification link
    // You can implement custom logic here if needed
    redirect('/home')
  }

  // Redirect to home if parameters are missing
  redirect('/home')
}