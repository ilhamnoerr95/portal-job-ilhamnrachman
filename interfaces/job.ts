// interfaces/job.ts

export interface SalaryRange {
  min: number;
  max: number;
  currency: string;
  display_text: string;
}

export interface ListCard {
  badge: string;
  started_on_text: string;
  cta: string;
}

export interface JobData {
  id: string;
  slug: string;
  title: string;
  status: "active" | "inactive" | "draft";
  salary_range: SalaryRange;
  list_card: ListCard;
  min_salary?: number;
  max_salary?: number;
  job_type_id?: number;
  canidates_needed?: number;
}

export interface JobType {
  id: string;
  created_at: string;
  name: string;
}

export interface JobResponse {
  data: JobData[];
}
