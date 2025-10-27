"use client";
import { useActionState, useEffect, useState } from "react";
import FormFieldTemplate from "@/components/template/FormResume";
import { Button } from "@/components/atoms/button";
import { JobFormState } from "@/interfaces/stateForm.type";
import { ArrowLeft, Info } from "lucide-react";
import { useRouter } from "next/navigation";

const initialState: JobFormState = {};

type Field = {
  key: string;
  validation: { required: boolean };
};

type ApplicationForm = {
  id: number;
  title: string;
  fields: Field[];
};

// ini contoh mock datanya
// kalo mau apakah validatau tidak, tinggal mainkan rquirednya saja
const formDataMock: ApplicationForm = {
  id: 1,
  title: "Apply Front End at Rakamin",
  fields: [
    { key: "photo_profile", validation: { required: false } },
    { key: "full_name", validation: { required: true } },
    { key: "date_of_birth", validation: { required: true } },
    { key: "gender", validation: { required: true } },
    { key: "domicile", validation: { required: true } },
    { key: "phone_number", validation: { required: true } },
    { key: "email", validation: { required: true } },
    { key: "linkedin_link", validation: { required: true } },
  ],
};

// Action untuk submit (client/server)
async function submitFormResume(
  prevState: JobFormState,
  formData: FormData,
  formDataMock: ApplicationForm
): Promise<JobFormState> {
  const data = Object.fromEntries(formData.entries()) as Record<string, string>;
  const trimmed = Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v.trim()]));

  const errors: Record<string, string> = {};

  // untuk memisahkan dynamic mana aja yg required dan tidak
  for (const field of formDataMock.fields) {
    const { key, validation } = field;
    if (validation.required && !trimmed[key]) {
      errors[key] =
        key === "email"
          ? "Please enter your email in the format: name@example.com"
          : key === "linkedin_link"
            ? "Please copy paste your Linkedin URL, example: https://www.linkedin.com/in/username"
            : "Required";
    }
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, message: "Please fix the errors" };
  }

  console.log("📝 Submitted:", trimmed);
  return { success: true, message: "Job successfully published!" };
}

export default function DynamicApplicationForm() {
  const router = useRouter();
  const [form, setForm] = useState<Record<string, string>>({
    full_name: "",
    photo_profile: "",
    email: "",
    linkedin_link: "",
    phone_number: "",
    domicile: "",
    date_of_birth: "",
    gender: "",
  });

  const [state, formAction, isPending] = useActionState(
    (prev: JobFormState, formData: FormData) => submitFormResume(prev, formData, formDataMock),
    initialState
  );

  useEffect(() => {
    if (state?.success) {
      // redirect ke halaman lain
      router.push("/users/resume-sent"); // ubah sesuai kebutuhanmu
    }
  }, [state, router]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-gray-50 p-4">
      <form
        action={formAction}
        id="post-resume"
        noValidate
        className="relative flex flex-col w-full max-w-[700px] bg-white border border-[#E0E0E0] rounded-xl shadow-sm overflow-hidden"
        style={{ maxHeight: "700px" }}
      >
        {/* Scrollable form body */}
        <div className="flex-1 overflow-y-auto px-14 py-4 space-y-5">
          {/* Header */}
          <div className="pt-6 pb-4 flex justify-between items-center mb-4">
            <div className="flex gap-4">
              <Button
                size="sm"
                type="button"
                variant="normal"
                className="w-auto h-auto rounded-md transition border border-[#E0E0E0]"
                onClick={() => router.push("/users")}
              >
                <ArrowLeft size={20} className="text-[#616161]" />
              </Button>
              <h2 className="text-[18px] font-semibold text-gray-800">{formDataMock.title}</h2>
            </div>
            <p className="text-sm text-[#404040] flex gap-2">
              <Info size={18} className="text-gray-500" />
              This field required to fill
            </p>
          </div>
          <span className="text-red-500 text-xs font-bold">* Required</span>
          {formDataMock.fields.map((field) => (
            <FormFieldTemplate
              key={field.key}
              field={field}
              onChange={handleChange}
              state={state}
              form={form}
            />
          ))}
          {/* Spacer agar tidak ketutup tombol submit */}
          <div className="h-24" />
        </div>

        {/* Fixed Submit Button */}
        <div className="sticky bottom-0 bg-white border-t border-[#E0E0E0] py-4 px-14">
          <Button
            form="post-resume"
            type="submit"
            className="w-full bg-[#01777F] text-white py-3 rounded-md hover:bg-[#01666E] transition cursor-pointer"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
