"use client";
import InputBase from "./InputBase";
import { FC, InputHTMLAttributes } from "react";
import PasswordComponent from "./Password";
import SearchComponent from "./Search";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  error?: string;
};

const Input: FC<InputProps> & {
  Password: typeof PasswordComponent;
  Search: typeof SearchComponent;
} = (props) => {
  return <InputBase {...props} />;
};

// attach variants
Input.Password = PasswordComponent;
Input.Search = SearchComponent;

export default Input;
