import { Button, jobStatusStyle } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { Tag } from "@/components/atoms/tag";
import { mockJobs } from "@/mock/jobdata";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="flex gap-6">
      {/* LEFT: Job List section */}
      <div className="flex-1">
        {/* search + job cards */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search by job details"
            className="w-full border border-gray-200 rounded-full px-4 py-3 focus:outline-none focus:ring-1 focus:ring-teal-600"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-teal-600">
            <Image src="/u_search.png" alt="icon" height={20} width={20} />
          </div>
        </div>

        {/* Job Card */}
        {mockJobs.map((job) => (
          <Card key={job.id} className="relative mb-4" padding="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Tag variant={jobStatusStyle[job.status].variant} className="rounded-xs">
                {jobStatusStyle[job.status].label}
              </Tag>

              {job.startedAt && (
                <Tag variant="gray" className="rounded-md font-normal">
                  started on {job.startedAt}
                </Tag>
              )}
            </div>

            <h3 className="text-lg font-bold text-gray-700 mb-1">{job.title}</h3>
            <p className="text-sm text-gray-600 mb-6">{job.salary}</p>

            <Button size="sm" className="absolute bottom-6 right-6 cursor-pointer">
              Manage Job
            </Button>
          </Card>
        ))}
      </div>

      {/* CTA Recruit Panel */}
      <div className="w-full md:w-[300px] md:block mt-6 md:mt-0">
        <Card
          className="w-full md:w-[300px] h-auto md:h-[168px] flex flex-col bg-transparent relative overflow-hidden"
          padding="p-4 md:p-5"
        >
          {/* Background image (hanya tampil di desktop) */}
          <div
            className="hidden md:block absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/meeting.webp')" }}
            aria-hidden="true"
          />

          {/* Overlay hitam 72% di atas bg image (juga hanya desktop) */}
          <div
            className="hidden md:block absolute inset-0 bg-[rgba(0,0,0,0.72)]"
            aria-hidden="true"
          />

          {/* Konten card di atas semua layer */}
          <div className="relative z-10 flex flex-col h-full text-center gap-2">
            <h3 className="text-sm font-semibold text-gray-50 mb-1">Recruit the best candidates</h3>

            <p className="text-xs text-gray-100 mb-3 flex-grow">
              Create jobs, invite, and hire with ease
            </p>

            <Button fullWidth className="rounded-md cursor-pointer">
              Create a new job
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Page;
