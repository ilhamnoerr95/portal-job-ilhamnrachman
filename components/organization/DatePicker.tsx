"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

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
  const [currentMonth, setCurrentMonth] = useState<number>(
    value ? value.getMonth() : new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    value ? value.getFullYear() : new Date().getFullYear()
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
    onChange?.(newDate);
    setIsOpen(false);
  };

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
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const changeYear = (offset: number) => {
    setCurrentYear((prev) => prev + offset);
  };
  return (
    <div className="w-full" ref={dropdownRef}>
      {label && (
        <label className="block text-xs text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      {/* Input field */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={` relative flex items-center justify-between px-3 h-11 rounded-md cursor-pointer bg-white transition-all ${
          errorMessage
            ? "border-2 border-red-500 focus-within:ring-1 focus-within:ring-red-400"
            : "border-2 border-[#E0E0E0] focus-within:ring-1 focus-within:ring-[#01959F]"
        }`}
      >
        <Calendar size={18} className="text-gray-500" />
        <input
          name={name}
          readOnly
          value={formattedDate}
          placeholder={placeholder}
          className="w-full  pl-2 text-sm bg-transparent outline-none placeholder-gray-400 cursor-pointer"
        />
        <ChevronDown
          size={18}
          className={clsx(
            "text-gray-500 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </div>

      {/* Dropdown Calendar */}
      {isOpen && (
        <div className="absolute mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-20">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <button
              title="prev-year"
              onClick={() => changeYear(-1)}
              className="p-1 rounded hover:bg-gray-100 text-gray-500"
            >
              «
            </button>
            <div className="flex items-center gap-2">
              <button
                title="prev-month"
                onClick={() => changeMonth(-1)}
                className="p-1 rounded hover:bg-gray-100"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm font-bold text-gray-700">
                {months[currentMonth]} {currentYear}
              </span>
              <button
                title="next-month"
                onClick={() => changeMonth(1)}
                className="p-1 rounded hover:bg-gray-100"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            <button
              title="next-year"
              onClick={() => changeYear(1)}
              className="p-1 rounded hover:bg-gray-100 text-gray-500"
            >
              »
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, index) => (
              <div key={index}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 text-sm text-gray-700">
            {Array.from({ length: firstDay }).map((_, idx) => (
              <div key={`empty-${idx}`} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, dayIdx) => {
              const day = dayIdx + 1;
              const isSelected =
                selectedDate &&
                day === selectedDate.getDate() &&
                currentMonth === selectedDate.getMonth() &&
                currentYear === selectedDate.getFullYear();

              return (
                <div
                  key={day}
                  onClick={() => handleDateSelect(day)}
                  className={`py-1.5 cursor-pointer rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-1
                hover:bg-gray-100 transition
                ${isSelected ? "border-2 border-orange-400 text-orange-500 font-semibold" : ""}`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && <p className="text-xs text-red-600 mt-2">{errorMessage}</p>}
    </div>
  );
};

export default DatePickerWithValidation;
