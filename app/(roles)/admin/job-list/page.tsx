"use client";
import { Button, jobStatusStyle } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { Input } from "@/components/atoms/Input/Index";
import { Tag } from "@/components/atoms/tag";
import Image from "next/image";
import React from "react";
import Modal from "@/components/organization/modal";
import JobOpeningForm from "@/components/template/FormPostJob";
import Toast, { StatusNotif } from "@/components/atoms/Notif";
import EmptyState from "@/components/atoms/SpesialState";
import { JobData, JobType } from "@/interfaces/job";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { groupOptions } from "@/hook/queryOption";
import { useLoadingStore } from "@/store/loadingStore";
import Loader from "@/components/atoms/Loader";
import { converDate } from "@/utils/convertDate";

const Page = () => {
  const { isLoading: isLoaderModal } = useLoadingStore();

  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [showNotif, setShowNotif] = React.useState<{
    show: boolean;
    status: StatusNotif;
  }>({
    show: false,
    status: "success",
  });
  // jobType
  const { data: jobTypeData, isLoading } = useQuery(
    groupOptions<JobType[]>({
      queryKey: ["/api/job_type"],
      auth: false,
      config: {
        enabled: open,
      },
    })
  );

  const {
    data: jobListData,
    isLoading: LoadingJobList,
    refetch: refetchJobList,
  } = useQuery(
    groupOptions<JobData[]>({
      queryKey: ["/api/job_list"],
      auth: false,
    })
  );
  const filteredJobs = jobListData?.filter(
    (job: JobData) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.status.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(jobListData);
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
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {LoadingJobList && <Loader />}
        {filteredJobs?.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 mt-20">
            <EmptyState
              image={"/emptyState.webp"}
              text="Create a job opening now and start the candidate process."
              btn={true}
              handleOpen={() => setOpen(true)}
            />
          </div>
        ) : (
          jobListData &&
          filteredJobs?.map((job: any) => (
            <Card key={job.id} className="relative mb-4 h-[156px]" padding="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Tag
                  variant={jobStatusStyle[job.status as keyof typeof jobStatusStyle].variant as any}
                  className="rounded-md"
                >
                  {jobStatusStyle[job.status as keyof typeof jobStatusStyle].label}
                </Tag>

                {job.created_at && (
                  <Tag variant="gray" className="rounded-sm font-normal text-sm">
                    started on {converDate(job.created_at)}
                  </Tag>
                )}
              </div>

              <h3 className="text-lg font-bold text-gray-700 mb-2">{job.title}</h3>
              <p className="text-sm text-gray-600 mb-6">
                Rp{job.min_salary} - {job.max_salary}
              </p>

              <Button
                size="sm"
                className="absolute rounded-lg bottom-9 right-6 cursor-pointer"
                onClick={() => router.push(`/admin/manage-job/${job.id}`)}
              >
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

            <p className="text-xs text-gray-100 mb-3 grow">
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
              isLoading={isLoaderModal}
            >
              Publish job
            </Button>
          </>
        }
      >
        <JobOpeningForm
          id="post-job"
          setNotif={setShowNotif}
          closeModal={setOpen}
          jobTypeData={jobTypeData}
          isLoadingTypeData={isLoading}
          refetchJobList={() => refetchJobList()}
        />
      </Modal>
      {/* toast notif*/}
      {showNotif.show && (
        <Toast
          show={showNotif.show}
          message="Job vacancy successfully created"
          type={showNotif.status}
          position="bottom-left"
          transitionFrom="left"
          duration={4000}
          onClose={() => setShowNotif((e) => ({ ...e, show: false }))}
        />
      )}
    </div>
  );
};

export default Page;
