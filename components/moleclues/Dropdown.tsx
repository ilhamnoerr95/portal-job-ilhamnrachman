"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import Image from "next/image";

interface Country {
  name: string;
  code: string;
  dial_code: string;
  flag: string;
}

interface PhoneInputProps {
  countries: Country[];
  onChange?: (phone: string) => void;
  defaultCountryCode?: string;
  errorMessage?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  countries,
  onChange,
  defaultCountryCode = "ID",
  errorMessage,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countries.find((c) => c.code === defaultCountryCode) || countries[0]
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Tutup dropdown jika klik di luar area
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleChange = (value: string) => {
    setPhoneNumber(value);
    onChange?.(`${selectedCountry.dial_code}${value}`);
  };

  return (
    <div className="w-full">
      {/* Input wrapper */}
      <div
        ref={dropdownRef}
        className={`relative flex items-center rounded-md h-11 bg-white transition-all ${
          errorMessage
            ? "border-2 border-red-500 focus-within:ring-1 focus-within:ring-red-400"
            : "border-2 border-[#E0E0E0] focus-within:ring-1 focus-within:ring-[#01959F]"
        }`}
      >
        {/* Country Selector */}
        <button
          title="button-country"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex items-center gap-2 pl-3 pr-2 h-full focus:outline-none"
        >
          <Image
            src={selectedCountry.flag}
            alt={`${selectedCountry.name} flag`}
            height={16}
            width={16}
            className="rounded-sm"
          />
          <ChevronDown
            size={14}
            className={`text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Divider */}
        <span className="h-6 w-px bg-gray-300 mx-2" />
        <span className="text-sm text-gray-700">+{selectedCountry.dial_code}</span>

        {/* Phone Number Input */}
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="81234567890"
          className="flex-1 pl-3 text-sm h-full border-none outline-none focus:ring-0 placeholder-gray-400"
        />

        {/* Country Dropdown */}
        {isOpen && (
          <div className="absolute top-12 left-0 w-[346px] bg-white border border-[#E0E0E0] rounded-lg shadow-lg z-20">
            {/* Search bar */}
            <div className="relative p-2 border-b border-gray-100">
              <Search
                size={16}
                className="absolute left-6 top-1/2 -translate-y-1/2 text-[#F4A100]"
              />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-7 py-1.5 text-sm border border-[#E0E0E0] rounded-md outline-none focus:ring-1 focus:ring-[#01959F]"
              />
              {searchTerm && (
                <X
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchTerm("")}
                />
              )}
            </div>

            {/* Country list */}
            <ul className="max-h-60 overflow-y-auto">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <li
                    key={country.code}
                    onClick={() => handleSelect(country)}
                    className={`flex justify-between items-center px-3 py-2 text-sm cursor-pointer hover:bg-[#F7FEFE] ${
                      selectedCountry.code === country.code ? "bg-[#F1FCFC]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={country.flag}
                        alt={`${country.name} flag`}
                        height={16}
                        width={16}
                        className="rounded-sm"
                      />
                      <span className="text-gray-700">{country.name}</span>
                    </div>
                    <span className="text-gray-500">+ {country.dial_code}</span>
                  </li>
                ))
              ) : (
                <li className="py-4 text-center text-gray-500 text-sm">No countries found</li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Error message */}
      {errorMessage && <p className="text-xs text-red-600 mt-1">{errorMessage}</p>}
    </div>
  );
};

export default PhoneInput;
