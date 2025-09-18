import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    //Nextjs lowercase options error fix
    if (request.method === "OPTIONS") {
        return new NextResponse(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        });
      }

    // Check for token and redirect if not found
    const token = request.cookies.get('next-auth.session-token')
    if(!token){
        return NextResponse.redirect(new URL('/login', request.url))
    } else {
        return NextResponse.next()
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/products","/brands","/products/:path*","/categories","/cart","/wishlist"],
}