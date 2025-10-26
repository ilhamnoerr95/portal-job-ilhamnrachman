import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import Input from "@/components/atoms/Input/input";
import Image from "next/image";
import LoginGoogle from "@/components/organization/LoginGoogle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-4">
      <Card className="flex flex-col items-center w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-200 p-10 relative">
        {/* Logo */}
        <div className="flex items-center gap-2 left-0 -top-18 absolute">
          <Image src="/logo_rakamin.png" alt="Rakamin Logo" width={145} height={50} />
        </div>

        {/* Title */}
        <div className="w-full text-left mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Masuk ke Rakamin</h2>
          <p className="text-sm text-gray-600">
            Belum punya akun?{" "}
            <a href="#" className="text-[#01959F] font-medium hover:underline">
              Daftar menggunakan email
            </a>
          </p>
        </div>

        {/* Form */}
        <form className="w-full space-y-3">
          <div>
            <label className="block text-xs font-medium text-[#404040] mb-2">Alamat email</label>
            <Input
              type="email"
              placeholder="contoh@email.com"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            />
          </div>

          <Button
            variant="secondary"
            type="submit"
            className="w-full  font-medium py-2.5 rounded-md transition"
          >
            Kirim link
          </Button>

          {/* OR separator */}
          <div className="flex items-center gap-2 py-1">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Alternative buttons */}
          <Button
            variant="normal"
            type="button"
            className="w-full border border-gray-300 rounded-md py-2.5 flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-50 transition"
          >
            <Image src="/key.png" height={12} width={12} alt="key" />
            <span className="text-sm font-medium">Masuk dengan kata sandi</span>
          </Button>
          <LoginGoogle />
        </form>
      </Card>
    </div>
  );
}
