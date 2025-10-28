"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerProps {
  label?: string;
  placeholder?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  errorMessage?: string;
  required?: boolean;
  name?: string;
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const DatePickerWithValidation: React.FC<DatePickerProps> = ({
  label = "Date of birth",
  placeholder = "Select your date of birth",
  value = null,
  onChange,
  errorMessage,
  required,
  name,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value);
  const [currentMonth, setCurrentMonth] = useState(
    value ? value.getMonth() : new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState(
    value ? value.getFullYear() : new Date().getFullYear()
  );
  const [viewMode, setViewMode] = useState<"day" | "month" | "year">("day");
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setViewMode("day");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  const changeMonth = (offset: number) => {
    let newMonth = currentMonth + offset;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const changeYear = (offset: number) => {
    setCurrentYear((prev) => prev + offset);
  };

  const selectDate = (day: number) => {
    const d = new Date(currentYear, currentMonth, day);
    setSelectedDate(d);
    onChange?.(d);
    setIsOpen(false);
    setViewMode("day");
  };

  const decadeStart = Math.floor(currentYear / 10) * 10;
  const years = Array.from({ length: 12 }).map((_, i) => decadeStart - 1 + i);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  return (
    <div className="w-full relative" ref={dropdownRef}>
      {label && (
        <label className="block text-xs text-gray-700 mb-1">
          {label} {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`relative flex items-center justify-between px-3 h-11 rounded-md bg-white cursor-pointer border-2 transition-all ${
          errorMessage ? "border-red-500" : "border-[#E0E0E0] focus-within:ring-[#01959F]"
        }`}
      >
        <Calendar size={18} className="text-gray-500" />
        <input
          name={name}
          readOnly
          value={formattedDate}
          placeholder={placeholder}
          className="w-full pl-2 text-sm bg-transparent outline-none"
        />
        <ChevronDown
          size={18}
          className={`text-gray-500 transition-transform ${isOpen && "rotate-180"}`}
        />
      </div>

      {isOpen && (
        <div className="absolute mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-20">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => {
                  if (viewMode === "day") changeYear(-1);
                  if (viewMode === "month") changeYear(-12);
                  if (viewMode === "year") setCurrentYear((y) => y - 10);
                }}
                className="text-gray-500 hover:bg-gray-100 px-1"
              >
                «
              </button>
              <button
                title="chevright"
                type="button"
                onClick={() => {
                  if (viewMode === "day") changeMonth(1);
                }}
                className="p-1 rounded hover:bg-gray-100"
              >
                <ChevronLeft size={16} />
              </button>
            </div>

            <span
              className="text-sm font-bold cursor-pointer"
              onClick={() =>
                setViewMode((prev) =>
                  prev === "day" ? "month" : prev === "month" ? "year" : "year"
                )
              }
            >
              {viewMode === "day" && `${months[currentMonth]} ${currentYear}`}
              {viewMode === "month" && currentYear}
              {viewMode === "year" && `${decadeStart} - ${decadeStart + 9}`}
            </span>
            <div className="flex items-center">
              <button
                title="chevright"
                type="button"
                onClick={() => {
                  if (viewMode === "day") changeMonth(1);
                }}
                className="p-1 rounded hover:bg-gray-100"
              >
                <ChevronRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (viewMode === "day") changeYear(1);
                  if (viewMode === "month") changeYear(12);
                  if (viewMode === "year") setCurrentYear((y) => y + 10);
                }}
                className="text-gray-500 hover:bg-gray-100 px-1"
              >
                »
              </button>
            </div>
          </div>

          {viewMode === "day" && (
            <>
              <div className="grid grid-cols-7 text-xs text-gray-500 mb-2 text-center">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, index) => (
                  <div key={index}>{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 text-sm text-center">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={i}></div>
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const selected =
                    selectedDate &&
                    day === selectedDate.getDate() &&
                    currentMonth === selectedDate.getMonth() &&
                    currentYear === selectedDate.getFullYear();

                  return (
                    <div
                      key={day}
                      onClick={() => selectDate(day)}
                      className={`py-1 cursor-pointer rounded-full mx-auto w-8 h-8 flex items-center justify-center hover:bg-gray-100 ${
                        selected ? "border-2 border-orange-400 text-orange-500 font-semibold" : ""
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {viewMode === "month" && (
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              {months.map((m, idx) => (
                <div
                  key={m}
                  onClick={() => {
                    setCurrentMonth(idx);
                    setViewMode("day");
                  }}
                  className="py-2 rounded-lg cursor-pointer hover:bg-gray-100"
                >
                  {m}
                </div>
              ))}
            </div>
          )}

          {viewMode === "year" && (
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              {years.map((yr) => (
                <div
                  key={yr}
                  onClick={() => {
                    setCurrentYear(yr);
                    setViewMode("month");
                  }}
                  className={`py-2 rounded-lg cursor-pointer ${
                    yr < decadeStart || yr > decadeStart + 9
                      ? "text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {yr}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {errorMessage && <p className="text-xs text-red-600 mt-2">{errorMessage}</p>}
    </div>
  );
};

export default DatePickerWithValidation;
