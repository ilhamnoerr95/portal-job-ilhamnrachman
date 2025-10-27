import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        //  Ini sekadar contoh
        if (credentials?.email === "admin@example.com" && credentials?.password === "supersecret") {
          return {
            id: "1",
            name: "Admin Sungguhan",
            email: "admin@example.com",
            image: "/profile.webp",
            roles: ["admin"],
          };
        }

        // default: role user
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
    async jwt({ token, user }: any) {
      // Jika login pertama dari Google, ambil email
      if (user) {
        const email = user.email ?? token.email;

        if (email === "admin@example.com") {
          token.roles = ["admin"];
        } else {
          token.roles = ["user"];
        }
      }

      return token;
    },
    async session({ session, token }: any) {
      // Masukkan roles ke session
      session.user.roles = token.roles;
      return session;
    },

    // async redirect({ url, baseUrl, token, account, user }: any) {
    //   // Hanya redirect berdasarkan role jika baru login
    //   if (account && token) {
    //     console.log("aa", token, account);
    //     if (token.roles?.includes("admin")) {
    //       return `${baseUrl}/admin`;
    //     }
    //     return `${baseUrl}/users`;
    //   }

    //   // Default behavior: return to callbackUrl or stay
    //   return url.startsWith(baseUrl) ? url : baseUrl;
    // },
  },
  pages: {
    signIn: "/login", // opsional
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
