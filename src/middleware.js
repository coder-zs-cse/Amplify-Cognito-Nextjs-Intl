import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { authenticatedUser } from "./utils/amplify-server-utils";

const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'id'],
  defaultLocale: 'en'
});

export async function middleware(request) {
  let response = NextResponse.next();

  // Apply internationalization
  const intlResult = await intlMiddleware(request);
  
  // Update the response and request with intl results
  if (intlResult instanceof NextResponse) {
    response = intlResult;
    // We need to create a new request object based on the modified URL
    request = new NextRequest(new URL(intlResult.headers.get('x-middleware-rewrite') || request.url), request);
  }

  // Authenticate user
  const user = await authenticatedUser({ request, response });
  
  // console.log("user details inside middleware", user);
  const isAuthPage = request.nextUrl.pathname.endsWith('/login') || request.nextUrl.pathname.endsWith('/register');
  if(user && isAuthPage){
    return NextResponse.redirect(new URL("/home", request.nextUrl));
  }
  return response
  // authorization
  // const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
  // const isOnAdminArea = request.nextUrl.pathname.startsWith("/dashboard/admins");

  // if (isOnDashboard) {
  //   if (!user)
  //     return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  //   if (isOnAdminArea && !user.isAdmin)
  //     return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  // } else if (user && !isOnDashboard) {
  //   return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  // }

  // return response;
}

export const config = {
  matcher: [
    // Match all pathnames except the ones starting with: 
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - .*\.png$ (png files)
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    // Include internationalized routes
    '/', '/(id|en)/:path*'
  ]
};