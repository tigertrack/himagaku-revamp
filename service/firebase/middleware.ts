import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  const protectedPaths = ["/quiz", "/home", "/history", "/preferences", "/translate"];
  
  const sessionCookie = request.cookies.get('session')?.value
  const hasSession = !!sessionCookie

  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))
  const isAuthPath = ['/login', '/register'].includes(request.nextUrl.pathname)

  if (!hasSession && isProtectedPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (hasSession && isAuthPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/home'
    return NextResponse.redirect(url)
  }

  return NextResponse.next({ request })
}
