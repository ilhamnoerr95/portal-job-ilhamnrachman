// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // sesuaikan path

// NextAuth mengembalikan handler yang sudah typed
const handler = NextAuth(authOptions);

// Export **hanya** method HTTP yang diizinkan
export { handler as GET, handler as POST };
