"use client";

import Input from "../atoms/Input/input";
import { JobFormState } from "@/interfaces/stateForm.type";
import SelectBase from "../moleclues/Select";
import Dropdown from "../moleclues/Dropdown";
import DatePickerWithValidation from "../organization/DatePicker";

type Field = {
  key: string;
  validation: { required: boolean };
};

type Props = {
  field: Field;
  onChange: (key: string, value: string) => void;
  state: JobFormState;
  form: Record<string, string>;
};

export default function FormFieldTemplate({ field, onChange, state, form }: Props) {
  const { key, validation } = field;
  const required = validation.required;

  switch (key) {
    case "photo_profile":
      return (
        <div className="flex flex-col items-center gap-2">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            👤
          </div>
          <button
            type="button"
            className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white hover:bg-gray-50"
          >
            Take a Picture
          </button>
        </div>
      );

    case "date_of_birth":
      return (
        <DatePickerWithValidation
          required={required}
          errorMessage={state.errors?.["date_of_birth"]}
          onChange={(d: any) => onChange("date_of_birth", d)}
          label="Date of birth"
          name="date_of_birth"
        />
      );
    case "gender":
      return (
        <div className="flex flex-col gap-1 relative">
          <label className="font-medium text-xs text-[#404040]">
            Pronoun (gender)
            {required && <span className="text-red-500">*</span>}
          </label>

          <div className="flex gap-6 mt-1">
            {/* She/her */}
            <label className="flex items-center gap-2 cursor-pointer text-gray-800">
              <span className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={form[key] === "female"}
                  onChange={(e) => onChange(key, e.target.value)}
                  className="peer appearance-none w-5 h-5 border border-black rounded-full cursor-pointer"
                />
                <span className="absolute w-3 h-3 bg-[#01959F] rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
              </span>
              <span className="text-[14px] text-[#404040]">She/her (Female)</span>
            </label>

            {/* He/him */}
            <label className="flex items-center gap-2 cursor-pointer text-gray-800">
              <span className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={form[key] === "male"}
                  onChange={(e) => onChange(key, e.target.value)}
                  className="peer appearance-none w-5 h-5 border border-black rounded-full cursor-pointer"
                />
                <span className="absolute w-3 h-3 bg-[#01959F] rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
              </span>
              <span className="text-[14px] text-[#404040]">He/him (Male)</span>
            </label>
          </div>
          {state?.errors?.[key] && (
            <p className="text-xs text-red-500 mt-1">{state.errors.gender}</p>
          )}
        </div>
      );

    case "domicile":
      return (
        <div className="flex flex-col gap-1">
          <label className="font-medium text-xs text-[#404040]">
            Domicile {required && <span className="text-red-500">*</span>}
          </label>

          <SelectBase
            options={["Jakarta", "Bandung", "Surabaya"]}
            placeholder="Choose your domicile"
            value={form["domicile"]}
            onChange={(val) => onChange("domicile", val)}
            className="border-[#E0E0E0]"
            error={state.errors?.domicile}
          />
          <input type="hidden" name="domicile" value={form["domicile"]} required />
        </div>
      );

    case "phone_number":
      return (
        <div className="flex flex-col gap-1">
          <label className="font-medium text-xs text-[#404040]">
            Phone Number {required && <span className="text-red-500">*</span>}
          </label>

          <Dropdown
            countries={[
              { name: "Indonesia", dial_code: "62", code: "1", flag: "/indo.png" },
              { name: "Palestine", dial_code: "60", code: "2", flag: "/palestine.png" },
              { name: "Poland", dial_code: "65", code: "3", flag: "/poland.png" },
            ]}
            onChange={(val) => onChange("phone_number", val.toString())}
            errorMessage={state.errors?.phone_number}
            name="phone_number"
          />
        </div>
      );

    default:
      return (
        <div className="flex flex-col gap-1">
          <label className="font-medium capitalize text-xs text-[#404040]">
            {key.replace(/_/g, " ")}
            {required && <span className="text-red-500">*</span>}
          </label>
          <Input
            name={key}
            type="text"
            value={form?.[key]}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            placeholder={`Enter your ${key.replace(/_/g, " ")}`}
            onChange={(e) => onChange(key, e.target.value)}
            error={state.errors?.[key]}
          />
        </div>
      );
  }
}
