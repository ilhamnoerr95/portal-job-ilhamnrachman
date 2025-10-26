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
}

export interface JobResponse {
  data: JobData[];
}
