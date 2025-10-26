"use client";

import { useState } from "react";
import { jobs } from "@/mock/jobs";
import { Card } from "@/components/atoms/card";
import clsx from "clsx";
import Image from "next/image";
import { MapPin } from "lucide-react";
import EmptyState from "@/components/atoms/SpesialState";
import { useRouter } from "next/navigation";

export default function JobsPage() {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState(jobs[0]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 px-4 md:px-10 lg:px-14 py-6 md:py-8 h-[calc(100vh-100px)] overflow-hidden">
      {jobs.length === 0 ? (
        <div className="col-span-full flex flex-col items-center justify-center text-center gap-4">
          <EmptyState
            image="/emptyState.webp"
            text={"Create a job opening now and start the candidate process."}
          />
        </div>
      ) : (
        <>
          {/* Sidebar */}
          <div className="overflow-y-auto max-h-full px-2 py-2">
            <div className="space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {jobs.map((job) => {
                const isActive = selectedJob.id === job?.id;
                return (
                  <Card
                    key={job?.id}
                    hoverable
                    border={!isActive} // matikan border default ketika aktif
                    className={clsx(
                      "cursor-pointer w-full transition-all",
                      isActive
                        ? "border-[#01777F] bg-[#F7FEFF]"
                        : "hover:border-[#01777F] hover:bg-[#F7FEFF]"
                    )}
                    onClick={() => setSelectedJob(job)}
                  >
                    <div className="flex flex-col justify-between h-full">
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
                          <p className="text-xs md:text-sm text-gray-500">{job.company}</p>
                        </div>
                      </div>
                      {/* divider */}
                      <div className="w-full h-px bg-[radial-gradient(circle,#E0E0E0_1px,transparent_1.5px)] bg-size-[6px_1px] mb-2"></div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin size={16} className="text-[#616161]" />
                        <p className="text-[10px] md:text-sm text-[#616161] truncate">
                          {job.location}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Image src="/money.png" alt="logo-money" width={16} height={16} />
                        <p className="text-[10px] md:text-sm text-[#616161] font-medium">
                          Rp{job.minSalary.toLocaleString()} - Rp{job.maxSalary.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Job detail */}
          <div className="md:col-span-2 overflow-y-auto max-h-full">
            <Card className="p-5 md:p-8 h-full min-h-0 overflow-y-auto">
              <div className="flex items-start justify-between mb-4 border-b border-[#E0E0E0]">
                {/* Logo + Info */}
                <div className="flex items-start gap-3 mb-6">
                  <Image
                    src="/rakamin.png"
                    alt="rakamin"
                    width={48}
                    height={48}
                    className="rounded-lg"
                  />

                  <div className="ml-3">
                    <span className="bg-[#43936C] text-white text-[10px] md:text-xs font-normal px-3 py-1 rounded-sm w-fit mb-1 inline-block">
                      {selectedJob.type}
                    </span>

                    <h2 className="text-base md:text-lg my-2 font-semibold text-gray-800 leading-tight">
                      {selectedJob.title}
                    </h2>

                    <p className="text-xs md:text-sm text-[#757575]">{selectedJob.company}</p>
                  </div>
                </div>

                {/* Apply Button */}
                <button
                  type="button"
                  className="cursor-pointer bg-[#FBC037] font-semibold text-black px-3 md:px-5 py-2 
                  text-xs md:text-sm rounded-md hover:bg-[#E0A92F] transition shrink-0"
                  onClick={() => router.push(`/users/resume/${selectedJob.id}`)}
                >
                  Apply
                </button>
              </div>

              <ul className="list-disc pl-4 md:pl-5 space-y-2 text-xs md:text-sm mt-6 text-gray-700">
                {selectedJob.description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
