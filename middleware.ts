
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest ) {

  if ( req.nextUrl.pathname.startsWith('/checkout') ) {

        const token = req.cookies.get('token')?.value || '';
        const previousPage = req.nextUrl.pathname
        
        try {
            await jose.jwtVerify(
                token,
                new TextEncoder().encode(process.env.JWT_SECRET_SEED)
              )
            return NextResponse.next();

        } catch (error) {
            return NextResponse.redirect( new URL(`/auth/login?page=${previousPage}`, req.url))
        }
    }

    
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/checkout/:path*'
  ]
}