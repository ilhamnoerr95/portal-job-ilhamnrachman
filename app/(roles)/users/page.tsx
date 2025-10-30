"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/atoms/card";
import clsx from "clsx";
import Image from "next/image";
import { MapPin } from "lucide-react";
import EmptyState from "@/components/atoms/SpesialState";
import { useRouter } from "next/navigation";
import { groupOptions } from "@/hook/queryOption";
import { JobData } from "@/interfaces/job";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/atoms/Loader";

const JOB_TYPES = [
  { id: 1, name: "Full Time" },
  { id: 2, name: "Contract" },
  { id: 3, name: "Internship" },
  { id: 4, name: "Freelance" },
  { id: 5, name: "Part-Time" },
];

export default function JobsPage() {
  const router = useRouter();

  const { data: jobListData, isLoading } = useQuery(
    groupOptions<JobData[]>({
      queryKey: ["/api/job_list"],
      auth: false,
    })
  );

  const [selectedJobState, setSelectedJob] = useState<JobData | undefined>(undefined);

  // Derived: pilih job pertama jika belum ada selectedJob
  const selectedJob: JobData | undefined =
    jobListData && jobListData.length > 0 ? (selectedJobState ?? jobListData[0]) : undefined;
  const getJobType = (id?: number) => JOB_TYPES.find((type) => type.id === id)?.name || "Unknown";

  if (isLoading) return <Loader />;

  if (!jobListData?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] px-4">
        <EmptyState
          image="/emptyState.webp"
          text="Create a job opening now and start the candidate process."
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 px-4 md:px-10 lg:px-14 py-6 md:py-8 h-[calc(100vh-100px)] overflow-hidden">
      {/* Sidebar */}
      <aside className="overflow-y-auto max-h-full px-2 py-2">
        <div className="space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {jobListData.map((job) => {
            const isActive = selectedJob?.id === job.id;
            return (
              <Card
                key={job.id}
                hoverable
                border={!isActive}
                onClick={() => setSelectedJob(job)}
                className={clsx(
                  "cursor-pointer w-full transition-all duration-200",
                  isActive
                    ? "border-[#01777F] bg-[#F7FEFF]"
                    : "hover:border-[#01777F] hover:bg-[#F7FEFF]"
                )}
              >
                <div className="flex flex-col justify-between h-full">
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-2">
                    <Image
                      src="/rakamin.png"
                      alt="rakamin"
                      width={48}
                      height={48}
                      className="rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm md:text-base">
                        {job.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500">Rakamin</p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-[radial-gradient(circle,#E0E0E0_1px,transparent_1.5px)] bg-size-[6px_1px] mb-2"></div>

                  {/* Location */}
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={16} className="text-[#616161]" />
                    <p className="text-[10px] md:text-sm text-[#616161] truncate">Jakarta</p>
                  </div>

                  {/* Salary */}
                  <div className="flex items-center gap-2">
                    <Image src="/money.png" alt="money" width={16} height={16} />
                    <p className="text-[10px] md:text-sm text-[#616161] font-medium">
                      Rp{job.min_salary?.toLocaleString()} - Rp{job.max_salary?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </aside>

      {/* Detail */}
      <section className="md:col-span-2 overflow-y-auto max-h-full">
        <Card className="p-5 md:p-8 h-full overflow-y-auto">
          <div className="flex items-start justify-between mb-4 border-b border-[#E0E0E0] pb-4">
            {/* Header */}
            <div className="flex items-start gap-3">
              <Image
                src="/rakamin.png"
                alt="rakamin"
                width={48}
                height={48}
                className="rounded-lg"
              />
              <div>
                <span className="bg-[#43936C] text-white text-[10px] md:text-xs font-normal px-3 py-1 rounded-sm w-fit mb-1 inline-block">
                  {getJobType(selectedJob?.job_type_id)}
                </span>
                <h2 className="text-base md:text-lg font-semibold text-gray-800 leading-tight">
                  {selectedJob?.title}
                </h2>
                <p className="text-xs md:text-sm text-[#757575]">Rakamin</p>
              </div>
            </div>

            {/* Apply */}
            <button
              type="button"
              className="bg-[#FBC037] hover:bg-[#E0A92F] text-black font-semibold px-3 md:px-5 py-2 text-xs md:text-sm rounded-md transition shrink-0 cursor-pointer"
              onClick={() => router.push(`/users/resume/${selectedJob?.id}`)}
            >
              Apply
            </button>
          </div>

          {/* Job Description */}
          <ul className="list-disc pl-4 md:pl-5 space-y-2 text-xs md:text-sm text-gray-700 mt-4">
            {[
              "Design and improve user experiences through user research and testing.",
              "Collaborate with product teams to define user flows and prototypes.",
              "Ensure consistency in visual design and usability across products.",
              "Work with developers to bring designs to life with precision.",
            ].map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  );
}
