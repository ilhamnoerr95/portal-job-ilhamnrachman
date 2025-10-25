"use client";
import { Button, jobStatusStyle } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { Input } from "@/components/atoms/Input/Index";
import { Tag } from "@/components/atoms/tag";
import Image from "next/image";
import { mockJobs } from "@/mock/jobdata";
import React from "react";
import Modal from "@/components/organization/modal";
import JobOpeningForm from "@/components/template/FormPostJob";

const Page = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex gap-6">
      {/* LEFT: Job List section */}
      <div className="flex-1">
        {/* search + job cards */}
        <div className="relative mb-6">
          <Input.Search
            suffix={<Image src="/u_search.png" alt="icon" height={20} width={20} />}
            placeholder="Search by job details"
            type="text"
          />
        </div>
        {mockJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 mt-20">
            <div className="w-full max-w-[300px] sm:h-[300px] mx-auto aspect-square relative">
              <Image
                src="/emptyState.webp"
                alt="empty-state"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 200px, 300px"
              />
            </div>
            <div className="text-center position-relative">
              <p className="font-bold text-2xl ">No job openings available</p>
              <p className=" text-gray-500 my-4">
                Create a job opening now and start the candidate process.
              </p>
              <Button
                size="md"
                className="cursor-pointer rounded-md bg-yellow-400  text-zinc-950 hover:bg-yellow-500"
                onClick={() => setOpen(true)}
              >
                Create a new job
              </Button>
            </div>
          </div>
        ) : (
          mockJobs.map((job) => (
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
          ))
        )}
        {/* Job Card */}
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

            <Button fullWidth className="rounded-md cursor-pointer" onClick={() => setOpen(true)}>
              Create a new job
            </Button>
          </div>
        </Card>
      </div>

      {/* modal */}
      <Modal
        open={open}
        title="Job Opening"
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button
              className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 cursor-pointer"
              form="post-job"
            >
              Publish job
            </Button>
          </>
        }
      >
        <JobOpeningForm id="post-job" />
      </Modal>
    </div>
  );
};

export default Page;
