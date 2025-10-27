"use client";
import { FC, ReactNode } from "react";
import clsx from "clsx";

type InputBaseProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  placeholder?: string;
  className?: string;
  prefixClassName?: string;
  error?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputBase: FC<InputBaseProps> = ({
  type = "text",
  prefix,
  suffix,
  placeholder,
  className,
  error,
  disabled = false,
  onChange,
  prefixClassName,
  ...props
}) => {
  return (
    <div className="relative w-full">
      {prefix && (
        <div
          className={clsx(
            "absolute left-3 top-1/2 -translate-y-1/2 text-gray-500",
            prefixClassName
          )}
        >
          {prefix}
        </div>
      )}

      <input
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        className={clsx(
          "w-full rounded-md px-4 py-3 focus:outline-none border-2 border-[#E0E0E0]",
          "focus:ring-1",
          disabled
            ? "bg-gray-400 text-gray-400 cursor-not-allowed border-gray-200"
            : error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-200 focus:ring-teal-600",
          prefix && "pl-10",
          suffix && "pr-10",
          className
        )}
        {...props}
      />

      {suffix && (
        <div
          className={clsx(
            "absolute right-3 -translate-y-1/2 text-gray-500",
            error ? "top-[1.4rem]" : "top-1/2"
          )}
        >
          {suffix}
        </div>
      )}

      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
    </div>
  );
};
export default InputBase;
