"use client";
import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { useSelectedLayoutSegments, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "../atoms/button";
import { ChevronRight } from "lucide-react";

type roles = "admin" | "users";

type NavbarProps = {
  text?: string;
  shadow?: boolean;
  image: string;
  roles?: roles;
  name?: string;
  email?: string;
};

const Navbar: React.FC<NavbarProps> = ({ text, shadow = false, image, roles, name, email }) => {
  const router = useRouter();
  const segments = useSelectedLayoutSegments(); // array of segments for current route
  // contoh segments: ["users", "123"] untuk /users/123/123
  const isUserDetail = segments[0] === "users" && segments.length >= 2 && !!segments[1];
  const manageJob = segments[0] === "admin" && segments.length > 2;

  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  if (isUserDetail) return null;

  return (
    <nav
      className={clsx(
        "font-bold flex items-center justify-between  py-4",
        roles === "admin" ? "px-6" : "px-30",
        shadow ? "shadow-md" : "bg-white border-b border-gray-300"
      )}
    >
      {manageJob ? (
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="normal"
            className="border rounded-md border-[#E0E0E0] cursor-pointer"
            style={{ fontWeight: "bold" }}
            onClick={() => router.push("/admin/job-list")}
          >
            Job list
          </Button>
          <ChevronRight size={18} />
          <Button
            type="button"
            size="sm"
            variant="normal"
            className="border rounded-md border-[#C2C2C2]"
            style={{ background: "#EDEDED", fontWeight: "bold" }}
          >
            Manage Canidate
          </Button>
        </div>
      ) : (
        <div className="text-base md:text-lg">{text}</div>
      )}
      <div className="flex items-center gap-2">
        <div>
          <p className="text-xs font-semibold">{email}</p>
          <p className="text-xs font-normal">{name}</p>
        </div>
        <Image
          src={image}
          width={28}
          height={38}
          alt="profile-picture"
          className="rounded-full object-cover cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        />
        {open && (
          <div className="absolute z-10 right-2 top-13 bg-white border border-gray-200 rounded-md shadow-lg w-36 p-2">
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
    </nav>
  );
};

export default Navbar;
