"use client";
import { FC, useState, useMemo } from "react";
import { ChevronDown, X, Search } from "lucide-react";
import clsx from "clsx";
import { Button } from "../atoms/button";

type OptionType = {
  id: string | number;
  name: string;
  [key: string]: any;
};

type SelectBaseProps = {
  isLoadingOpt?: boolean;
  options: OptionType[];
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string | number) => void;
  className?: string;
  error?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  valueKey?: string; // default: 'id'
  labelKey?: string; // default: 'name'
};

const SelectBase: FC<SelectBaseProps> = ({
  options,
  placeholder = "Select...",
  value,
  onChange,
  className,
  error,
  searchable = false,
  searchPlaceholder = "Search...",
  valueKey = "id",
  labelKey = "name",
  isLoadingOpt,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Filter options berdasarkan pencarian
  const filteredOptions = useMemo(() => {
    if (!searchable || !search.trim()) return options;
    return options.filter((opt) =>
      String(opt[labelKey]).toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search, searchable, labelKey]);

  // Cari label dari value yang dipilih
  const selectedLabel = useMemo(() => {
    const selected = options.find((opt) => opt[valueKey] === value);
    return selected ? selected[labelKey] : "";
  }, [options, value, labelKey, valueKey]);

  return (
    <div className="relative w-full text-sm">
      <Button
        variant="normal"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={clsx(
          "w-full border-2 rounded-md px-4 py-3 flex justify-between items-center text-left bg-white",
          open && "ring-1 ring-[#01959F]",
          error ? "border-red-500" : "border-gray-200 text-gray-800",
          className
        )}
      >
        <span
          className={clsx(!selectedLabel && !error && "text-gray-400", "truncate flex-1 text-left")}
        >
          {selectedLabel || placeholder}
        </span>
        <ChevronDown
          size={18}
          className={clsx("text-gray-500 transition-transform duration-200", open && "rotate-180")}
        />
      </Button>

      {open && (
        <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-md shadow-md z-10 max-h-56 overflow-y-auto">
          {searchable && (
            <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
                autoFocus
              />
              {search && (
                <button
                  title="btn"
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          )}

          {isLoadingOpt ? (
            <div>loading..</div>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((opt, index) => (
              <div
                key={index}
                onClick={() => {
                  onChange?.(opt[valueKey]);
                  setOpen(false);
                  setSearch("");
                }}
                className={clsx(
                  "px-4 py-2 cursor-pointer hover:bg-teal-50 font-semibold",
                  value === opt[valueKey] && "bg-teal-100 text-teal-700"
                )}
              >
                {opt[labelKey]}
              </div>
            ))
          ) : (
            <p className="px-4 py-3 text-gray-400 text-sm">No results found</p>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default SelectBase;
