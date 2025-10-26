"use client";

import { signIn } from "next-auth/react";
import { Button } from "../atoms/button";
import Image from "next/image";
import { sign } from "crypto";

export default function LoginGoogle() {
  return (
    <Button
      onClick={() => signIn("google")}
      variant="normal"
      type="button"
      className="w-full border border-gray-300 rounded-md py-2.5 flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-50 transition"
    >
      <Image src="/google.png" alt="Google icon" width={18} height={18} />
      <span>Masuk dengan Google</span>
    </Button>
  );
}
