"use client";

import { useState } from "react";
import { useActionState } from "react";
import { Input } from "../atoms/Input/Index";
import SelectBase from "../moleclues/Select";
import ProfileSettingRow, { Option } from "../moleclues/Radio";
import { StatusNotif } from "../atoms/Notif";

type JobFormState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string>;
};

const initialState: JobFormState = {};

// Action untuk submit (client/server)
async function submitJobForm(prevState: JobFormState, formData: FormData): Promise<JobFormState> {
  const jobName = formData.get("jobName")?.toString().trim() || "";
  const jobType = formData.get("jobType")?.toString().trim() || "";
  const description = formData.get("description")?.toString().trim() || "";
  const candidates = formData.get("candidates")?.toString().trim() || "";

  // Convert FormData ke object
  const data = Object.fromEntries(formData.entries()) as Record<string, string>;

  // Trim semua value
  const trimmedData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, value.trim()])
  ) as Record<string, string>;

  // Validasi sederhana
  const errors: Record<string, string> = {};
  if (!jobName) errors.jobName = "Job name is required";
  if (!description) errors.description = "Description is required";
  if (!candidates) errors.candidates = "Candidate count is required";
  if (!jobType) errors.jobType = "Job Type is required";

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, message: "Please fix the errors" };
  }

  console.log("📝 Submitted:", trimmedData);

  return { success: true, message: "Job successfully published!" };
}

export default function JobOpeningForm({
  id = "jobOpeningForm",
  setNotif,
  closeModal,
}: {
  id?: string;
  setNotif: React.Dispatch<React.SetStateAction<{ show: boolean; status: StatusNotif }>>;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [state, formAction, isPending] = useActionState(async (prev: any, formData: any) => {
    const result = await submitJobForm(prev, formData);
    console.log(result);
    if (!result.errors) {
      if (result.success) {
        setNotif({ show: true, status: "success" });
        closeModal(false);
      } else {
        setNotif({ show: true, status: "error" });
      }
    }

    return result;
  }, initialState);

  // 🧩 Controlled states supaya value nggak hilang
  const [jobName, setJobName] = useState("");
  const [jobType, setJobType] = useState("");
  const [description, setDescription] = useState("");
  const [candidates, setCandidates] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  const [settings, setSettings] = useState<Record<string, Option>>({
    "Full name": "Mandatory",
    "Photo Profile": "Mandatory",
    Gender: "Mandatory",
    Domicile: "Mandatory",
    Email: "Mandatory",
    "Phone number": "Mandatory",
    "Linkedin link": "Mandatory",
    "Date of birth": "Mandatory",
  });

  const handleChangeRadio = (key: string, value: Option) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const disabledMap: Record<string, Option[]> = {
    "Full name": ["Optional", "Off"],
    "Photo Profile": ["Optional", "Off"],
    Email: ["Optional", "Off"],
  };

  return (
    <form action={formAction} id={id} noValidate className="space-y-6 w-full">
      {/* Job Name */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-3 block">
          Job Name<span className="text-red-600">*</span>
        </label>
        <Input
          name="jobName"
          placeholder="e.g. Front End Developer"
          value={jobName}
          onChange={(e) => setJobName(e.target.value)}
          error={state?.errors?.jobName}
        />
      </div>

      {/* Job Type */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-3 block">
          Job Type<span className="text-red-600">*</span>
        </label>
        <SelectBase
          options={["Full-time", "Contract", "Part-time", "Internship", "Freelance"]}
          placeholder="Select job type"
          value={jobType}
          onChange={(val) => setJobType(val)}
          className="border-[#E0E0E0]"
          error={state.errors?.jobType}
        />
        <input type="hidden" name="jobType" value={jobType} required />
      </div>

      {/* Job Description */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-3 block">
          Job Description<span className="text-red-600">*</span>
        </label>
        <textarea
          name="description"
          placeholder="Describe the job responsibilities..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`w-full border-2 border-[#E0E0E0] rounded-md px-4 py-3 text-sm min-h-[120px] focus:outline-none focus:ring-1 ${
            state?.errors?.description
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-200 focus:ring-teal-600"
          }`}
        />
        {state?.errors?.description && (
          <p className="text-xs text-red-500 mt-1">{state.errors.description}</p>
        )}
      </div>

      {/* Number of Candidates */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-3 block">
          Number of Candidates Needed<span className="text-red-600">*</span>
        </label>
        <Input
          type="number"
          name="candidates"
          placeholder="e.g. 1"
          value={candidates}
          onChange={(e) => setCandidates(e.target.value)}
          error={state?.errors?.candidates}
        />
      </div>
      <div
        className="border-b-2"
        style={{
          borderImage:
            "repeating-linear-gradient(to right, #E0E0E0 0 10px, transparent 2px 20px) 1",
        }}
      ></div>
      {/* Salary */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-3 block">Job Salary</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">Minimum Estimated Salary</label>
            <Input
              name="minSalary"
              placeholder="Minimum e.g. Rp 7.000.000"
              prefix={(<strong>Rp</strong>) as any}
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-2">Maximum Estimated Salary</label>
            <Input
              name="maxSalary"
              placeholder="Maximum e.g. Rp 8.000.000"
              prefix={(<strong>Rp</strong>) as any}
              value={maxSalary}
              onChange={(e) => setMaxSalary(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Minimum Profile Information */}
      <div className="border border-[#E0E0E0] rounded-md p-6 relative text-sm">
        <h3 className="font-bold text-gray-800 text-base mb-6 relative right-2">
          Minimum Profile Information Required
        </h3>

        <div className="divide-y divide-gray-100">
          {Object.keys(settings).map((key) => (
            <ProfileSettingRow
              key={key}
              label={key}
              value={settings[key]}
              disabledOptions={disabledMap[key] || []}
              onChange={(val) => handleChangeRadio(key, val)}
            />
          ))}
        </div>
      </div>
    </form>
  );
}
