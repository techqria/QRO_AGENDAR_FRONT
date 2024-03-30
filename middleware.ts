import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import authService from "./graphql/services/auth.service";

export async function middleware(request: NextRequest) {
    if (request.url.includes('/login')) return NextResponse.next()

    const token = request.cookies.get('token')?.value;

    if (!token) return NextResponse.redirect(new URL('/login', request.url))

    const result = await authService.verifyToken(token)
    if (!result?.userId) return NextResponse.redirect(new URL('/login', request.url))

    if (request.url.includes(result.userRole)) return NextResponse.next()

    return NextResponse.redirect(new URL(`/${result.userRole}`, request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/', '/login', '/admin', '/employee', '/manager'],
}