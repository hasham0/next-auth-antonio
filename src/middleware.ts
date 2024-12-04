import NextAuth from "next-auth";
import authConfig from "@/authentication/auth.config";
import {
  publicRoutes,
  apiAuthPrifix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const pathname = nextUrl.pathname;

  const isApiAuthRoute = pathname.startsWith(apiAuthPrifix);
  if (isApiAuthRoute) return;

  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  if (!isLoggedIn && !isPublicRoute && !isAuthRoute) {
    let callbackUrl = pathname;
    if (pathname.search) {
      callbackUrl += pathname.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(new URL(`/login?${encodedCallbackUrl}`, nextUrl));
  }

  return;
});

export const config = {
  matcher: [
    "/((?!_next|api/auth/session|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
