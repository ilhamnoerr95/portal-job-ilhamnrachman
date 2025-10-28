import CandidateTable from "@/components/organization/Table";
import { candidatesData } from "@/mock/canidate";
import React from "react";
import EmptyState from "@/components/atoms/SpesialState";

const Page = () => {
  return candidatesData.length > 0 ? (
    <CandidateTable data={candidatesData} />
  ) : (
    <div>
      <h3 className="font-bold mb-6">Front End Developer</h3>
      <div className="flex flex-col border border-[#E0E0E0] h-[80vh] text-center items-center justify-center">
        <EmptyState
          height="260px"
          width="276px"
          image={"/canidateNotFound.png"}
          text={
            "Congratulations! You've taken the first step towards a rewarding career at Rakamin. We look forward to learning more about you during the application process."
          }
          title={"🎉 Your application was sent!"}
          btn={false}
        />
      </div>
    </div>
  );
};

export default Page;
