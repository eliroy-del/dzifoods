import { NextResponse, type NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/proxy";

const AUTH_PAGES = new Set([
  "/admin/login",
  "/admin/forgot-password",
  "/admin/reset-password",
  "/admin/auth/callback",
]);

function isStaffPath(pathname: string): boolean {
  return pathname.startsWith("/admin") || pathname.startsWith("/pos") || pathname.startsWith("/kds");
}

export async function proxy(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  if (!isStaffPath(pathname) || AUTH_PAGES.has(pathname)) {
    return response;
  }

  if (!user) {
    const login = new URL("/admin/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/pos/:path*", "/kds/:path*"],
};
