"use server";

import { JobFormState } from "@/interfaces/stateForm.type";
import { redirect } from "next/navigation";

export async function submitFormLogin(
  prevState: JobFormState,
  formData: FormData,
  mode: string
): Promise<JobFormState> {
  const email = formData.get("email")?.toString().trim() || "";
  const password = formData.get("password")?.toString().trim() || "";
  const data = Object.fromEntries(formData.entries()) as Record<string, string>;

  const errors: Record<string, string> = {};

  // Mode "email" hanya validasi email
  if (mode === "link") {
    if (!email) errors.email = "Email is required";
  } else {
    // Mode normal, email + password wajib
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, message: "Please fix the errors" };
  }

  if (mode === "link") {
    redirect("/login/email-sent");
  } else {
    // Contoh validasi spesifik admin
    if (email === "admin@example.com" && password !== "supersecret") {
      return {
        success: false,
        errors: { password: "Invalid admin password" },
        message: "Authentication failed",
      };
    }
  }

  console.log("📝 Submitted:", data);

  return {
    success: true,
    data: { email, password },
    message: mode === "link" ? "Email validated successfully!" : "Login successfully!",
  };
}
