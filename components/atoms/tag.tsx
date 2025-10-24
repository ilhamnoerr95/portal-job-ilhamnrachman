import React from "react";
import clsx from "clsx";

type TagVariant = "green" | "red" | "yellow" | "gray" | "blue";

interface TagProps {
  children: React.ReactNode;
  variant?: TagVariant;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ children, variant = "gray", className }) => {
  const variantClasses = {
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
    yellow: "bg-yellow-100 text-yellow-600",
    gray: "bg-gray-100 text-gray-600",
    blue: "bg-blue-100 text-blue-600",
  };

  return (
    <span
      className={clsx(
        "px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
