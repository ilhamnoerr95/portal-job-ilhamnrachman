import Image from "next/image";
import clsx from "clsx";
import React from "react";

type NavbarProps = {
  text?: string;
  shadow?: boolean;
  image: string;
};

const Navbar: React.FC<NavbarProps> = ({ text, shadow = false, image }) => {
  return (
    <nav
      className={clsx(
        "font-bold flex items-center justify-between px-6 py-4",
        shadow ? "shadow-md" : "bg-white border-b border-gray-300"
      )}
    >
      <div className="text-base md:text-lg">{text}</div>
      <div>
        <Image src={image} width={28} height={38} alt="profile-picture" />
      </div>
    </nav>
  );
};

export default Navbar;
