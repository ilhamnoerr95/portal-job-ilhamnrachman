"use client";
import { useState, FC, InputHTMLAttributes } from "react";
import InputBase from "./InputBase";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../button";

type PasswordProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

const Password: FC<PasswordProps> = (props) => {
  const [visible, setVisible] = useState(false);

  return (
    <InputBase
      type={visible ? "text" : "password"}
      suffix={
        <Button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="text-gray-500 hover:text-gray-700"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </Button>
      }
      {...props}
    />
  );
};

export default Password;
