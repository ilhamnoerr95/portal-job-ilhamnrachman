import React from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "outline" | "subtle" | "normal" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

export const jobStatusStyle = {
  active: { label: "Active", variant: "green" },
  draft: { label: "Draft", variant: "yellow" },
  inactive: { label: "Inactive", variant: "red" },
} as const;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  ...props
}) => {
  const variants = {
    primary: "bg-teal-600 text-white hover:bg-teal-800",
    outline: "border border-teal-700 text-teal-700 hover:bg-teal-50",
    subtle: "bg-gray-100 text-gray-600 hover:bg-gray-200",
    normal: "bg-white text-gray-800",
    secondary: "bg-[#FBC037] hover:bg-[#E6A100] text-black",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 rounded-full",
    md: "text-sm px-4 py-2 rounded-full",
    lg: "text-base px-5 py-3 rounded-full",
  };

  return (
    <button
      className={clsx(
        "transition whitespace-nowrap",
        variant === "normal" ? "font-normal" : "font-semibold ",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
