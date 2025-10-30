"use client";
import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { useSelectedLayoutSegments, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "../atoms/button";
import { ChevronRight } from "lucide-react";

type Roles = "admin" | "users";

type NavbarProps = {
  text?: string;
  shadow?: boolean;
  image: string;
  roles?: Roles;
  name?: string;
  email?: string;
};

const Navbar: React.FC<NavbarProps> = ({ text, shadow = false, image, roles, name, email }) => {
  const router = useRouter();
  const segments = useSelectedLayoutSegments();

  const isUserDetail = segments[0] === "users" && segments.length >= 2 && !!segments[1];
  const manageJob = segments[0] === "admin" && segments.length > 2;

  const [open, setOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  if (isUserDetail) return null;

  // fungsi untuk open/close dengan delay agar smooth
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150); // delay 150ms
  };

  return (
    <nav
      className={clsx(
        "relative font-bold flex items-center justify-between py-4",
        roles === "admin" ? "px-6" : "px-8",
        shadow ? "shadow-md" : "bg-white border-b border-gray-300"
      )}
    >
      {manageJob ? (
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="normal"
            className="border rounded-md border-[#E0E0E0] cursor-pointer font-bold"
            onClick={() => router.push("/admin/job-list")}
          >
            Job list
          </Button>
          <ChevronRight size={18} />
          <Button
            type="button"
            size="sm"
            variant="normal"
            className="border rounded-md border-[#C2C2C2] bg-[#EDEDED] font-bold"
          >
            Manage Candidate
          </Button>
        </div>
      ) : (
        <div className="text-base md:text-lg">{text}</div>
      )}

      {/* Profile + Dropdown Area */}
      <div
        className="relative flex items-center gap-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div>
          <p className="text-xs font-semibold">{email}</p>
          <p className="text-xs font-normal">{name}</p>
        </div>

        <div className="relative">
          <Image
            src={image}
            width={32}
            height={32}
            alt="profile-picture"
            className="rounded-full object-cover cursor-pointer transition-transform hover:scale-105"
          />

          {/* Dropdown muncul */}
          {open && (
            <div
              className="absolute z-10 right-0 mt-3 bg-white border border-gray-200 rounded-md shadow-lg w-36 p-2 animate-fade-in"
              onMouseEnter={handleMouseEnter} // biar gak ilang saat hover ke dalam menu
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
