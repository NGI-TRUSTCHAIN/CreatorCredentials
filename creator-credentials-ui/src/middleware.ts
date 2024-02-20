import { authMiddleware } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: ['/welcome', '/api/auth/_log'],
  ignoredRoutes: [
    '/welcome',
    '/auth/login/issuer',
    '/auth/login/creator',
    '/auth/signup/issuer',
    '/auth/signup/creator',
    'api/signup/creator',
    'api/signup/issuer',
  ],
  afterAuth(auth) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      // return redirectToSignIn({ returnBackUrl: 'localhost:3105/welcome' }); //TODO add env var of server here
      return NextResponse.next();
    }

    // If the user is logged in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }

    // Allow users visiting public routes to access them
    return NextResponse.next();
  },
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
