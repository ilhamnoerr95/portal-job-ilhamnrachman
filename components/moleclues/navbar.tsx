"use client";
import React from "react";
import Image from "next/image";
import clsx from "clsx";
import { useSelectedLayoutSegments } from "next/navigation";
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
  const segments = useSelectedLayoutSegments(); // array of segments for current route
  // contoh segments: ["users", "123"] untuk /users/123/123
  const isUserDetail = segments[0] === "users" && segments.length >= 2 && !!segments[1];

  if (isUserDetail) return null;

  return (
    <nav
      className={clsx(
        "font-bold flex items-center justify-between  py-4",
        roles === "admin" ? "px-6" : "px-30",
        shadow ? "shadow-md" : "bg-white border-b border-gray-300"
      )}
    >
      <div className="text-base md:text-lg">{text}</div>
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
          className="rounded-full object-cover"
        />
      </div>
    </nav>
  );
};

export default Navbar;
