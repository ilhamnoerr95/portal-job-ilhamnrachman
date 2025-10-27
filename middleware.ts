import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ token, req }) {
      const pathname = req.nextUrl.pathname;
      const isAdmin = token?.roles?.includes("admin");

      if (pathname.startsWith("/admin")) {
        return isAdmin;
      }

      if (pathname.startsWith("/users")) {
        return token != null;
      }

      return true;
    },
  },
});

export const config = {
  matcher: ["/admin/:path*", "/users/:path*"],
};
