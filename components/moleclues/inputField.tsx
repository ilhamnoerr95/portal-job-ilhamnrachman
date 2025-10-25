import React from "react";
import Input from "../atoms/Input/InputBase";

type InputFieldProps = React.ComponentProps<typeof Input> & {
  label: string;
  required?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({ label, required, className, ...props }) => {
  const id = props.id || props.name;

  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1 select-none">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      <Input id={id} className={className} {...props} />
    </div>
  );
};

export default InputField;
