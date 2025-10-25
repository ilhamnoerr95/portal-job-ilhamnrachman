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
};

const SelectBase: FC<SelectBaseProps> = ({
  options,
  placeholder = "Select...",
  value,
  onChange,
  className,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={clsx("relative w-full text-sm", className)}>
      {/* Input area */}
      <Button
        variant="normal"
        type="button"
        onClick={() => setOpen(!open)}
        className={clsx(
          "w-full border rounded-md px-4 py-3 flex justify-between items-center text-left",
          "focus:ring-1 border-gray-200 bg-white"
        )}
      >
        <span className={clsx(value ? "text-gray-800" : "text-gray-400")}>
          {value || placeholder}
        </span>
        <ChevronDown
          size={18}
          className={clsx("text-gray-500 transition-transform duration-200", open && "rotate-180")}
        />
      </Button>

      {/* Dropdown list */}
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
                value === opt && "bg-teal-100 text-teal-700 font-medium"
              )}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectBase;
