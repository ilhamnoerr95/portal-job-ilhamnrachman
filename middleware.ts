// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // === ADMIN ROUTES ===
  if (pathname.startsWith("/admin")) {
    const isAdmin = token?.roles?.includes("admin");
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // === USER ROUTES (harus login) ===
  if (pathname.startsWith("/users")) {
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Izinkan akses
  return NextResponse.next();
}

// Matcher: hanya jalankan middleware untuk route tertentu
export const config = {
  matcher: ["/admin/:path*", "/users/:path*"],
};
