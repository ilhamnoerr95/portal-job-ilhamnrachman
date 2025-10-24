"use client";
import { FC, InputHTMLAttributes, ReactNode } from "react";
import InputBase from "./InputBase";
import { Search as SearchIcon } from "lucide-react";

type SearchProps = InputHTMLAttributes<HTMLInputElement> & {
  onSearch?: (value: string) => void;
  suffix?: ReactNode;
};

const Search: FC<SearchProps> = ({ onSearch, suffix, ...props }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch((e.target as HTMLInputElement).value);
    }
  };

  return (
    <InputBase
      placeholder="Search..."
      suffix={suffix ? suffix : <SearchIcon size={18} className="text-gray-500" />}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
};

export default Search;
