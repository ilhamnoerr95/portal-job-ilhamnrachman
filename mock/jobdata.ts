export type JobStatus = "active" | "draft" | "inactive";

export interface JobItem {
  id: string;
  title: string;
  salary: string;
  status: JobStatus;
  startedAt?: string; // hanya untuk active / inactive
}

export const mockJobs: JobItem[] = [
  // {
  //   id: "1",
  //   title: "Front End Developer",
  //   salary: "Rp7.000.000 - Rp8.000.000",
  //   status: "active",
  //   startedAt: "1 Oct 2025",
  // },
  // {
  //   id: "2",
  //   title: "Backend Wizard",
  //   salary: "Rp9.000.000 • Rp12.000.000",
  //   status: "draft",
  // },
  // {
  //   id: "3",
  //   title: "UI/UX Sorcerer",
  //   salary: "Rp6.500.000 • Rp9.500.000",
  //   status: "inactive",
  //   startedAt: "21 Sep 2025",
  // },
  // {
  //   id: "4",
  //   title: "Fullstack Ninja",
  //   salary: "Rp10.000.000 • Rp14.000.000",
  //   status: "active",
  //   startedAt: "10 Oct 2025",
  // },
];
