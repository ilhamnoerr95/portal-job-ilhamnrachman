"use client";
import { FC, useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import { Button } from "../atoms/button";

type SelectBaseProps = {
  options: string[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  error?: string;
};

const SelectBase: FC<SelectBaseProps> = ({
  options,
  placeholder = "Select...",
  value,
  onChange,
  className,
  error,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full text-sm">
      <Button
        variant="normal"
        type="button"
        onClick={() => setOpen(!open)}
        className={clsx(
          "w-full border-2 rounded-md px-4 py-3 flex justify-between items-center text-left bg-white",
          open && "ring-1",
          error ? "border-red-500 text-red-600" : "border-gray-200 text-gray-800",
          className
        )}
      >
        <span className={clsx(!value && !error && "text-gray-400")}>{value || placeholder}</span>
        <ChevronDown
          size={18}
          className={clsx(
            error ? "text-red-500" : "text-gray-500",
            "transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </Button>

      {open && (
        <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-md shadow-md z-10 max-h-56 overflow-y-auto">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange?.(opt);
                setOpen(false);
              }}
              className={clsx(
                "px-4 py-2 cursor-pointer hover:bg-teal-50 font-semibold",
                value === opt && "bg-teal-100 text-teal-700"
              )}
            >
              {opt}
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default SelectBase;
