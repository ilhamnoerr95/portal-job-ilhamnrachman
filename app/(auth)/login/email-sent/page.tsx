import { Card } from "@/components/atoms/card";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="flex min-h-screen text-center items-center justify-center bg-[#FAFAFA] px-4">
      <Card className="flex gap-4 flex-col items-center w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-200 p-10 relative">
        <h2 className="font-bold text-[24px]">Periksa Email Anda</h2>
        <p className="text-xs text-[#4C4C4C] mb-4">
          Kami sudah mengirimkan link login ke dityo@rakamin.com yang berlaku dalam 30 menit
        </p>
        <Image src="/character.png" height={184} width={154} alt="email-sent" />
      </Card>
    </div>
  );
};

export default Page;
