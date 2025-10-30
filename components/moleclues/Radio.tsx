import Input from "../atoms/Input/input";
import clsx from "clsx";

export type Option = "Mandatory" | "Optional" | "Off";

interface ProfileSettingRowProps {
  label: string;
  value: Option;
  disabledOptions?: Option[];
  onChange: (value: Option) => void;
}

const ProfileSettingRow = ({
  label,
  value,
  disabledOptions = [],
  onChange,
}: ProfileSettingRowProps) => {
  const formatLabel = (str: string) => {
    return str
      .split("_") // split by underscore
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize each word
      .join(" "); // join with space
  };

  const options: Option[] = ["Mandatory", "Optional", "Off"];

  return (
    <div className="flex justify-between items-center py-4 border-b border-gray-100">
      <span className="text-gray-700">{formatLabel(label)}</span>
      <div className="flex gap-2">
        {options.map((option) => {
          const isDisabled = disabledOptions.includes(option);

          return (
            <label key={option} className="cursor-pointer">
              <Input
                type="radio"
                name={label}
                value={option}
                checked={value === option}
                onChange={() => !isDisabled && onChange(option)}
                disabled={isDisabled}
                className="hidden"
              />
              <span
                className={clsx("px-4 py-2 rounded-full text-sm font-medium border transition", {
                  "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed": isDisabled,
                  "bg-transparent text-[#01959F] border-[#01959F]": !isDisabled && value === option,
                  "bg-white text-gray-600 border-[#E0E0E0] hover:text-[#01959F] hover:border-[#01959F] ":
                    !isDisabled && value !== option,
                })}
              >
                {option}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileSettingRow;
