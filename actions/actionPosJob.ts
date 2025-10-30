import { JobFormState } from "@/interfaces/stateForm.type";

export async function submitJobForm(
  prevState: JobFormState,
  formData: FormData,
  createMutation: any
): Promise<JobFormState> {
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

  //  Proses data berdasarkan aturan
  const processedData: Record<string, any> = {};

  for (const [key, value] of Object.entries(trimmedData)) {
    if (value === "Off")
      continue; //  skip field Off
    else if (value === "Mandatory") processedData[key] = true;
    else if (value === "Optional")
      processedData[key] = false; //  Optional = false
    else processedData[key] = value; // 🔤 lainnya tetap
  }

  // Validasi sederhana
  const errors: Record<string, string> = {};
  if (!jobName) errors.jobName = "Job name is required";
  if (!description) errors.description = "Description is required";
  if (!candidates) errors.candidates = "Candidate count is required";
  if (!jobType) errors.jobType = "Job Type is required";

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, message: "Please fix the errors" };
  }
  const dataMutate = {
    title: processedData.jobName,
    min_salary: Number(processedData.minSalary) || 0,
    max_salary: Number(processedData.maxSalary) || 0,
    canidates_needed: Number(processedData.candidates),
    job_type_id: Number(processedData.jobType),
    description: processedData.description,
    phone_number: processedData.phone_number,
    linkedin_link: processedData.linkedin_link,
    gender: processedData.gender,
    full_name: processedData.full_name,
    email: processedData.email,
    domicile: processedData.domicile,
    date_birth: processedData.date_birth,
    photo_profile: processedData.photo_profile,
    status: "inactive",
  };
  createMutation.mutate({
    ...dataMutate,
  } as any);

  return { success: true, message: "Job successfully published!" };
}
