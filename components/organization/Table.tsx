"use client";

import { FC } from "react";
import { Flame } from "lucide-react";
import clsx from "clsx";

type Candidate = {
  id: string;
  name: string;
  email: string;
  phone: string;
  stage: string;
  age: number;
  lastExperience: string;
  religion: string;
  domicile: string;
  gender: string;
  salary: string;
  matchRate: number;
};

type Props = {
  data: Candidate[];
};

const CandidateTable: FC<Props> = ({ data }) => {
  return (
    <div className="w-full overflow-auto bg-white rounded-lg shadow-md border border-gray-200">
      <table className="w-full text-sm min-w-max ">
        {/* Header */}
        <thead className="bg-[#FAFAFA] text-[#667185] border-b border-gray-200">
          <tr>
            <th className="p-4 sticky left-0 bg-[#FAFAFA] z-20 w-10">
              <input
                type="checkbox"
                title="Select all candidates"
                aria-label="Select all candidates"
                className="cursor-pointer size-4 border-2 border-[#01959F] rounded appearance-none checked:bg-[#01959F]"
              />
            </th>
            <th className="p-4 text-left font-semibold sticky border-r border-r-[#E0E0E0] left-10 bg-[#FAFAFA] z-20 whitespace-nowrap">
              NAMA LENGKAP
            </th>
            <th className="p-4 text-left font-semibold">MATCH RATE 🔥</th>
            <th className="p-4 text-left font-semibold">ALAMAT EMAIL</th>
            <th className="p-4 text-left font-semibold">NOMOR HP</th>
            <th className="p-4 text-left font-semibold">TAHAPAN</th>
            <th className="p-4 text-left font-semibold">USIA</th>
            <th className="p-4 text-left font-semibold">LAST EXPERIENCE</th>
            <th className="p-4 text-left font-semibold">AGAMA</th>
            <th className="p-4 text-left font-semibold">DOMISILI</th>
            <th className="p-4 text-left font-semibold">JENIS KELAMIN</th>
            <th className="p-4 text-right font-semibold">SALARY</th>
          </tr>
        </thead>

        <tbody className="text-[#1D2939]">
          {data.map((row) => (
            <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
              {/* Checkbox */}
              <td className="p-4 sticky left-0 bg-white z-10 w-10 ">
                <input
                  title="checkbox"
                  type="checkbox"
                  className="cursor-pointer size-4 border-2 border-[#01959F] rounded appearance-none checked:bg-[#01959F]"
                />
              </td>

              {/* Nama Lengkap Sticky */}
              <td
                className="p-4 sticky left-10 bg-white z-10 font-medium 
              whitespace-nowrap shadow-[4px_0_6px_-4px_rgba(0,0,0,0.15)] border-r border-r-[#E0E0E0]"
              >
                {row.name}
              </td>

              {/* Match Rate */}
              <td className="p-4">
                🤩 {row.matchRate}%
                {/* <span
                  className={clsx(
                    "inline-flex items-center gap-1 rounded-md px-2 py-[3px] font-semibold text-xs",
                    "border border-purple-500 text-purple-600 bg-purple-50"
                  )}
                >
                  <Flame size={14} className="text-purple-500" />
                </span> */}
              </td>

              {/* Email ellipsis */}
              <td className="p-4 max-w-[170px] truncate" title={row.email}>
                {row.email}
              </td>

              <td className="p-4">{row.phone}</td>

              <td className="p-4">
                <span className="px-3 py-1 rounded-sm text-xs font-semibold border border-[#4DB5BC] text-[#01959F] bg-[#F7FEFF]">
                  {row.stage.toUpperCase()}
                </span>
              </td>

              <td className="p-4">{row.age}</td>
              <td className="p-4 whitespace-nowrap">{row.lastExperience}</td>
              <td className="p-4">{row.religion}</td>
              <td className="p-4">{row.domicile}</td>
              <td className="p-4">{row.gender}</td>

              <td className="p-4 text-right font-medium">{row.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateTable;
