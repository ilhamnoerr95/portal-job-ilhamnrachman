"use client";

import SuccessState from "@/components/atoms/SpesialState";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/users");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div className="col-span-full min-h-screen flex flex-col items-center justify-center text-center gap-4">
      <SuccessState
        height="192px"
        width="214px"
        image={"/success_state.png"}
        text={
          "Congratulations! You've taken the first step towards a rewarding career at Rakamin. We look forward to learning more about you during the application process."
        }
        title={"🎉 Your application was sent!"}
      />
    </div>
  );
};

export default Page;
