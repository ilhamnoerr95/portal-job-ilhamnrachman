import { Card } from "@/components/atoms/card";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const FormLogin = dynamic(() => import("@/components/template/FormLogin"));

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    if (session?.user.roles.includes("admin")) {
      redirect("/admin");
    } else {
      redirect("/users");
    }
  }

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
        <FormLogin />
      </Card>
    </div>
  );
}
