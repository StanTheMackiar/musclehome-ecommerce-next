
import { NextFetchEvent, NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { ICartProduct } from './interfaces';
import { IShippingAddress } from './interfaces/shippingAddress';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest, ev: NextFetchEvent ) {

  // Leyendo las cookies
  const cart: ICartProduct[] = req.cookies.get('cart') && JSON.parse(req.cookies.get('cart')?.value as string) || [];
  const address: IShippingAddress = req.cookies.get('address') && JSON.parse(req.cookies.get('address')?.value as string);

  const previousPage = req.nextUrl.pathname
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  console.log({session})

  //! Verifiando login en pantallas exclusivas
  if ( req.nextUrl.pathname.startsWith( '/checkout' ) && !session ) return NextResponse.redirect( new URL(`/auth/login?page=${previousPage}`, req.url));
  if ( req.nextUrl.pathname.startsWith( '/admin' ) && !session ) return NextResponse.redirect( new URL(`/auth/login?page=${previousPage}`, req.url));
  if ( req.nextUrl.pathname.startsWith( '/api/admin' ) && !session ) return NextResponse.redirect( new URL(`/auth/login?page=${previousPage}`, req.url));
  if ( req.nextUrl.pathname.startsWith( '/orders' ) && !session ) return NextResponse.redirect( new URL(`/auth/login?page=${previousPage}`, req.url));
  


  //! En este punto ya el usuario estara loggeado
  if ( req.nextUrl.pathname.startsWith('/checkout/summary') ) {

      if ( cart.length === 0 ) return NextResponse.redirect( new URL(`/cart`, req.url))
      if ( !address ) return NextResponse.redirect( new URL(`/checkout/address`, req.url))

      return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/api/admin')) {
    const validRoles = ['admin', 'super-user']
    //@ts-ignore
    if ( !validRoles.includes( session.user.role ) ) return NextResponse.redirect( new URL('/', req.url) )
  }

  return NextResponse.next();

}

export const config = {
  matcher: [
    '/checkout/:path*',
    '/orders/:path*',
    '/profile/:path*',
    '/admin/:path*',
    '/api/admin/:path*',
  ]
}