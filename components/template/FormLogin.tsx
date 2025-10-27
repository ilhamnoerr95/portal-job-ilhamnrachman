"use client";

import React, { useActionState } from "react";
import { Button } from "@/components/atoms/button";
import Input from "@/components/atoms/Input/input";
import LoginGoogle from "@/components/organization/LoginGoogle";
import Image from "next/image";
import { signIn } from "next-auth/react";

import { JobFormState } from "@/interfaces/stateForm.type";
import { submitFormLogin } from "@/actions/formLogin";
const initialState: JobFormState = {};

const FormLogin = () => {
  const [mode, setMode] = React.useState<"link" | "withPassword">("link");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const [state, formAction, isPending] = useActionState(
    (prev: JobFormState, formData: FormData) => submitFormLogin(prev, formData, mode),
    initialState
  );

  if (state.success && state.data) {
    if (mode === "withPassword") {
      signIn("credentials", {
        email,
        password,
        callbackUrl: "/admin",
      });
    }
  }

  return (
    <form action={formAction} className="w-full space-y-3" id="post-login" noValidate>
      <div>
        <label className="block text-xs font-medium text-[#404040] mb-2">Alamat email</label>
        <Input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="contoh@email.com"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
          error={state.errors?.email}
        />
      </div>
      {mode === "withPassword" && (
        <div>
          <label className="block text-xs font-medium text-[#404040] mb-2">Alamat email</label>
          <Input.Password
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="masukkan password"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            error={state.errors?.password}
          />
        </div>
      )}

      <Button
        form="post-login"
        variant="secondary"
        type="submit"
        className="w-full  font-medium py-2.5 rounded-md transition"
      >
        {mode === "link" ? "Kirim link" : "Masuk"}
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
        onClick={() => {
          if (mode === "link") setMode("withPassword");
          else setMode("link");
        }}
      >
        <Image
          src={`${mode === "link" ? "/key.png" : "/mail.png"}`}
          height={12}
          width={12}
          alt="key"
        />
        <span className="text-sm font-medium">
          {mode === "link" ? "Masuk dengan kata sandi" : "Kirim link login melalui email"}
        </span>
      </Button>
      {/* login with google */}
      <LoginGoogle />
    </form>
  );
};

export default FormLogin;
