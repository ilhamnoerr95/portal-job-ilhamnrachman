// src/lib/auth.ts
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // contoh sederhana
        if (credentials?.email === "admin@example.com" && credentials?.password === "supersecret") {
          return {
            id: "1",
            name: "Admin Sungguhan",
            email: "admin@example.com",
            image: "/profile.webp",
            roles: ["admin"],
          };
        }

        return {
          id: "2",
          name: "User Mocking",
          email: credentials?.email,
          image: "/boy.webp",
          roles: ["user"],
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const email = user.email ?? token.email;
        token.roles = email === "admin@example.com" ? ["admin"] : ["user"];
      }
      return token;
    },

    async session({ session, token }) {
      session.user.roles = token.roles as string[];
      return session;
    },

    // Jika ingin redirect berdasarkan role, uncomment & sesuaikan:
    // async redirect({ url, baseUrl, token }) {
    //   if (token?.roles?.includes("admin")) return `${baseUrl}/admin`;
    //   return `${baseUrl}/users`;
    // },
  },

  pages: {
    signIn: "/login",
  },
};
